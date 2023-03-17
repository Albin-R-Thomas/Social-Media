import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { mockUser } from './mock-data/mock-data';
import { PostService } from './post.service';

describe('post service', () => {
  let service: PostService;
  let mockPrismaService = {
    post: {
      create: jest.fn().mockResolvedValue({}),
      findUniqueOrThrow: jest.fn().mockResolvedValue({}),
      findUnique: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      findMany: jest.fn().mockResolvedValue({}),
    },
    comment: {
      create: jest.fn().mockResolvedValue({}),
    },
  };
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [PostService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();
    service = module.get<PostService>(PostService);
  });
  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('insertPost', () => {
    it('should insert a new post', async () => {
      const post = await service.insertPost({}, mockUser.data.token);
      expect(post).toEqual({});
      expect(mockPrismaService.post.create).toBeCalledTimes(1);
    });
    it('should throw an error', async () => {
      jest.spyOn(mockPrismaService.post, 'create').mockRejectedValue({});
      try {
        const post = await service.insertPost({}, mockUser.data.token);
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPrismaService.post.create).toHaveBeenCalled();
      }
    });
  });

  describe('likePost', () => {
    it('should like a new post', async () => {
      const post = await service.likePost('', mockUser.data.token);
      expect(post).toEqual({});
      expect(mockPrismaService.post.findUnique).toBeCalledTimes(1);
      expect(mockPrismaService.post.update).toBeCalledTimes(1);
    });
    it('should throw an error', async () => {
      jest.spyOn(mockPrismaService.post, 'update').mockRejectedValue({});
      try {
        const post = await service.insertPost('', mockUser.data.token);
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPrismaService.post.update).toHaveBeenCalled();
        expect(mockPrismaService.post.findUnique).toHaveBeenCalled();
      }
    });
  });

  describe('unlikePost', () => {
    it('should unlike a new post', async () => {
      const post = await service.unlikePost('', mockUser.data.token);
      expect(post).toEqual({});
      expect(mockPrismaService.post.findUnique).toBeCalledTimes(2);
      expect(mockPrismaService.post.update).toBeCalledTimes(2);
    });
    it('should throw an error', async () => {
      jest.spyOn(mockPrismaService.post, 'update').mockRejectedValue({});
      try {
        const post = await service.unlikePost('', mockUser.data.token);
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPrismaService.post.update).toHaveBeenCalled();
        expect(mockPrismaService.post.findUnique).toHaveBeenCalled();
      }
    });
  });

  describe('comment', () => {
    it('should comment a new post', async () => {
      const post = await service.comment('', mockUser.data.token, '');
      expect(post).toEqual({});
      expect(mockPrismaService.comment.create).toBeCalledTimes(1);
    });
    it('should throw an error', async () => {
      jest.spyOn(mockPrismaService.comment, 'create').mockRejectedValue({});
      try {
        const post = await service.comment('', mockUser.data.token, '');
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPrismaService.comment.create).toHaveBeenCalled();
      }
    });
  });

  describe('getPosts', () => {
    it('should get a new post', async () => {
      const post = await service.getPosts('');
      expect(post).toEqual({});
      expect(mockPrismaService.post.findUniqueOrThrow).toBeCalledTimes(1);
    });
    it('should throw an error', async () => {
      jest
        .spyOn(mockPrismaService.post, 'findUniqueOrThrow')
        .mockRejectedValue({});
      try {
        const post = await service.getPosts('');
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPrismaService.post.findUniqueOrThrow).toHaveBeenCalled();
      }
    });
  });

  describe('getAllPosts', () => {
    it('should get all post', async () => {
      const post = await service.getAllPosts(mockUser.data.token);
      expect(post).toEqual({});
      expect(mockPrismaService.post.findMany).toBeCalledTimes(1);
    });
    it('should throw an error', async () => {
      jest.spyOn(mockPrismaService.post, 'findMany').mockRejectedValue({});
      try {
        const post = await service.getAllPosts(mockUser.data.token);
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPrismaService.post.findMany).toHaveBeenCalled();
      }
    });
  });
});
