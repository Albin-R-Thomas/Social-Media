import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
const secret = 'sdkl1(*&$#(*23';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async insertUser(userBody) {
    const hashedPassword = await bcrypt.hash(userBody.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: userBody.name,
        email: userBody.email,
        password: hashedPassword,
      },
    });
    const userCredentials = {
      id: user.id,
      name: user.name,
    };
    const token = jwt.sign(userCredentials, secret);
    return token;
  }

  async follow(id, token) {
    let currentUserId;
    try {
      const data: any = jwt.verify(token, secret);
      currentUserId = data.id;
      return currentUserId;
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

      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          followers: followedUser.followers + 1,
        },
      });
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          followings: currentUser.followings + 1,
        },
      });
      return `successfully followed user ${followedUser.name}`;
    } catch (error) {
      return { error: 'Some Error Occured' };
    }
  }

  async unFollow(id, token) {
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
      const unfollowedUser = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          followers: unfollowedUser.followers - 1,
        },
      });
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          followings: currentUser.followings - 1,
        },
      });
      return `successfully followed user ${unfollowedUser.name}`;
    } catch (error) {
      return { error: 'Some Error Occured' };
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
      });
      return currentUser;
    } catch (error) {
      return { error: 'Some Error Occured' };
    }
  }
}
