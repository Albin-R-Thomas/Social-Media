import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let controller: PostController;
  let mockPostService = {
    insertPost: jest.fn().mockResolvedValue(''),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    })
      .overrideProvider(PostService)
      .useValue(mockPostService)
      .compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('insertUser', () => {
    it('should insert a new user', async () => {
      const user = await mockPostService.insertPost({}, '');
      expect(user).toBeDefined();
    });
  });
});
