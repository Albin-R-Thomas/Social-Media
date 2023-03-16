import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
const secret = 'sdkl1(*&$#(*23';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async insertUser(userBody) {
    try {
      const hashedPassword = await bcrypt.hash(userBody.password, 10);
      const user = await this.prisma.user.create({
        data: {
          name: userBody.name,
          email: userBody.email,
          password: hashedPassword,
        },
      });
      return user;
    } catch (error) {
      return 'User is already present with same email';
    }
  }

  async authenticate(userBody) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: userBody.email,
        },
      });
      const isPasswordValid = await bcrypt.compare(
        userBody.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new Error('Invalid Credentials');
      }
      const userCredentials = {
        id: user.id,
        email: user.email,
      };
      const token = jwt.sign(userCredentials, secret);
      return token;
    } catch (error) {
      return {
        error,
        message:
          'You can create new user by => http://localhost:3000/api/user , Body required fields => {name,email,password}',
      };
    }
  }

  async follow(id, token) {
    let currentUserId;
    try {
      const data: any = jwt.verify(token, secret);
      currentUserId = data.id;
      if (id == currentUserId) {
        throw new Error('Can not like yourself');
      }
      const currentUser = await this.prisma.user.findUnique({
        where: {
          id: currentUserId,
        },
      });
      const followedUser = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      const followerString = `${currentUser.id}/${followedUser.id}`; // 1 follow 2
      const followingString = `${followedUser.id}/${currentUser.id}`; //2 followed by 1
      const follower = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          followers: followedUser.followers + 1,
          follower: {
            create: {
              id: followerString,
            },
          },
        },
        include: {
          follower: true,
          following: true,
        },
      });
      const followingUser = await this.prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          followings: currentUser.followings + 1,
          following: {
            create: {
              id: followingString,
            },
          },
        },
        include: {
          follower: true,
          following: true,
        },
      });
      return { follower: follower, following: followingUser };
    } catch (error) {
      return { error: error.message };
    }
  }

  async unFollow(id, token) {
    let currentUserId;
    try {
      const data: any = jwt.verify(token, secret);
      currentUserId = data.id;
      if (id == currentUserId) {
        throw new Error('Can not dislike yourself');
      }
      const currentUser = await this.prisma.user.findUnique({
        where: {
          id: currentUserId,
        },
      });
      const unfollowedUser = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      const followerString = `${currentUser.id}/${unfollowedUser.id}`;
      const followingString = `${unfollowedUser.id}/${currentUser.id}`;
      const unfollowed = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          followers: unfollowedUser.followers - 1,
          follower: {
            delete: {
              id: followerString,
            },
          },
        },
        include: {
          follower: true,
          following: true,
        },
      });
      const unfollowingUser = await this.prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          followings: currentUser.followings - 1,
          following: {
            delete: {
              id: followingString,
            },
          },
        },
        include: {
          follower: true,
          following: true,
        },
      });
      return { unflollowed: unfollowed, unfollowingUser: unfollowingUser };
    } catch (error) {
      return { error: error.message };
    }
  }

  async userDetails(token) {
    let currentUserId;
    try {
      const data: any = jwt.verify(token, secret);
      currentUserId = data.id;
      const currentUser = await this.prisma.user.findUnique({
        where: {
          id: currentUserId,
        },
        include: {
          follower: true,
          following: true,
        },
      });
      return currentUser;
    } catch (error) {
      return { error: error.message };
    }
  }
}
