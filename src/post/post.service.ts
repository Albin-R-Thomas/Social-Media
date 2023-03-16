import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
const secret = 'sdkl1(*&$#(*23';
@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async insertPost(postBody, token) {
    try {
      const data: any = jwt.verify(token, secret);
      const currentUserId = data.id;
      const newPost = await this.prisma.post.create({
        data: {
          title: postBody.title,
          desc: postBody.description,
          User: {
            connect: {
              id: currentUserId,
            },
          },
        },
        include: {
          User: true,
          postLike: {
            include: {
              User: true,
              Post: true,
            },
          },
          comment: true,
        },
      });
      return newPost;
    } catch (error) {
      return { error: error.message };
    }
  }

  async deletePost(id, token) {
    try {
      const data: any = jwt.verify(token, secret);
      const currentUserId = data.id;
      const post = await this.prisma.post.findUniqueOrThrow({
        where: {
          id: id,
        },
        include: {
          User: true,
          postLike: {
            include: {
              User: true,
              Post: true,
            },
          },
          comment: true,
        },
      });
      if (currentUserId != post.userId) {
        throw new Error('something Went Wrong');
      }
      await this.prisma.post.delete({
        where: {
          id: post.id,
        },
      });
      return post;
    } catch (error) {
      return { error: error.message };
    }
  }

  async likePost(id, token) {
    try {
      const data: any = jwt.verify(token, secret);
      const currentUserId = data.id;
      const post = await this.prisma.post.findUnique({
        where: {
          id: id,
        },
      });
      const likedPost = await this.prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          likes: post.likes + 1,
          postLike: {
            create: {
              User: {
                connect: { id: currentUserId },
              },
            },
          },
        },
        include: {
          User: true,
          postLike: {
            include: {
              User: true,
              Post: true,
            },
          },
          comment: true,
        },
      });
      return likedPost;
    } catch (error) {
      return { error: error.message.message };
    }
  }

  async unlikePost(id, token) {
    try {
      const data: any = jwt.verify(token, secret);
      const currentUserId = data.id;
      const post = await this.prisma.post.findUnique({
        where: {
          id: id,
        },
      });
      const unlikedPost = await this.prisma.post.update({
        where: {
          id: id,
        },
        data: {
          likes: post.likes - 1,
          postLike: {
            delete: {
              userId_postId: {
                userId: currentUserId,
                postId: post.id,
              },
            },
          },
        },
        include: {
          User: true,
          postLike: {
            include: {
              User: true,
              Post: true,
            },
          },
          comment: true,
        },
      });
      return unlikedPost;
    } catch (error) {
      return { error: error.message };
    }
  }

  async comment(id, token, commentBody) {
    try {
      const data: any = jwt.verify(token, secret);
      const currentUserId = data.id;
      const comment = await this.prisma.comment.create({
        data: {
          comment: commentBody.comment,
          Post: {
            connect: {
              id: id,
            },
          },
          User: {
            connect: {
              id: currentUserId,
            },
          },
        },
        include: {
          User: true,
          Post: true,
        },
      });
      return comment;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getPosts(id) {
    try {
      const posts = await this.prisma.post.findUniqueOrThrow({
        where: {
          id: id,
        },
        include: {
          User: true,
          postLike: {
            include: {
              User: true,
              Post: true,
            },
          },
          comment: true,
        },
      });
      return posts;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getAllPosts(token) {
    try {
      const data: any = jwt.verify(token, secret);
      const currentUserId = data.id;
      const posts = await this.prisma.post.findMany({
        where: {
          User: {
            id: currentUserId,
          },
        },
        include: {
          comment: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      });
      return posts;
    } catch (error) {
      return { error: error.message };
    }
  }
}
