import { Test } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('post controller', () => {
  let controller: PostController;
  let mockPostService = {
    insertPost: jest.fn().mockResolvedValue({}),
    deletePost: jest.fn().mockResolvedValue({}),
    likePost: jest.fn().mockResolvedValue({}),
    unlikePost: jest.fn().mockResolvedValue({}),
    comment: jest.fn().mockResolvedValue({}),
    getPosts: jest.fn().mockResolvedValue({}),
    getAllPosts: jest.fn().mockResolvedValue({}),
  };
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    })
      .overrideProvider(PostService)
      .useValue(mockPostService)
      .compile();
    controller = module.get<PostController>(PostController);
  });
  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('insertUser', () => {
    it('should insert a post', async () => {
      const post = await controller.insertUser({}, '');
      expect(post).toEqual({});
      expect(mockPostService.insertPost).toHaveBeenCalledWith({}, '');
    });
    it('should throw an err0r', async () => {
      try {
        const post = await controller.insertUser({}, '');
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPostService.insertPost).toHaveBeenCalledWith({}, '');
      }
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const post = await controller.deletePost('', '');
      expect(post).toEqual({});
      expect(mockPostService.deletePost).toHaveBeenCalledWith('', '');
    });
    it('should throw an err0r', async () => {
      try {
        const post = await controller.deletePost('', '');
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPostService.deletePost).toHaveBeenCalledWith('', '');
      }
    });
  });

  describe('likePost', () => {
    it('should like a post', async () => {
      const post = await controller.likePost('', '');
      expect(post).toEqual({});
      expect(mockPostService.likePost).toHaveBeenCalledWith('', '');
    });
    it('should throw an err0r', async () => {
      try {
        const post = await controller.likePost('', '');
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPostService.likePost).toHaveBeenCalledWith('', '');
      }
    });
  });

  describe('unlikePost', () => {
    it('should unlike a post', async () => {
      const post = await controller.unlikePost('', '');
      expect(post).toEqual({});
      expect(mockPostService.unlikePost).toHaveBeenCalledWith('', '');
    });
    it('should throw an err0r', async () => {
      try {
        const post = await controller.unlikePost('', '');
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPostService.unlikePost).toHaveBeenCalledWith('', '');
      }
    });
  });

  describe('commentOnPost', () => {
    it('should comment on a post', async () => {
      const post = await controller.commentOnPost('', '', '');
      expect(post).toEqual({});
      expect(mockPostService.comment).toHaveBeenCalledWith('', '', '');
    });
    it('should throw an err0r', async () => {
      try {
        const post = await controller.commentOnPost('', '', '');
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPostService.comment).toHaveBeenCalledWith('', '', '');
      }
    });
  });

  describe('getPosts', () => {
    it('should geta post', async () => {
      const post = await controller.getPosts('');
      expect(post).toEqual({});
      expect(mockPostService.getPosts).toHaveBeenCalledWith('');
    });
    it('should throw an err0r', async () => {
      try {
        const post = await controller.getPosts('');
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPostService.getPosts).toHaveBeenCalledWith('');
      }
    });
  });

  describe('getAllPosts', () => {
    it('should getAllPosts', async () => {
      const post = await controller.getAllPosts('');
      expect(post).toEqual({});
      expect(mockPostService.getAllPosts).toHaveBeenCalledWith('');
    });
    it('should throw an err0r', async () => {
      try {
        const post = await controller.getAllPosts('');
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPostService.getAllPosts).toHaveBeenCalledWith('');
      }
    });
  });
});
