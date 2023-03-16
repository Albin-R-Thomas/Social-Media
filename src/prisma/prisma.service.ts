import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:deadlyalbin130@reunion-db.cjxdme2nqwyh.eu-north-1.rds.amazonaws.com:5432/reunion?schema=public',
        },
      },
    });
  }
}
