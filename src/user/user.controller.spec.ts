import { UserController } from './user.controller';
import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
describe('user controller', () => {
  let controller: UserController;
  let mockUserService = {
    insertUser: jest.fn().mockResolvedValue({}),
    authenticate: jest.fn().mockResolvedValue({}),
    follow: jest.fn().mockResolvedValue({}),
    unFollow: jest.fn().mockResolvedValue({}),
    userDetails: jest.fn().mockResolvedValue({}),
  };
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();
    controller = module.get<UserController>(UserController);
  });
  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('create user', () => {
    it('should create a new user', async () => {
      const user = await controller.insertUser({});
      expect(user).toBeDefined();
      expect(mockUserService.insertUser).toHaveBeenCalledWith({});
    });
  });

  describe('authenticate user', () => {
    it('should authenticate a new user', async () => {
      const user = await controller.authenticate({});
      expect(user).toBeDefined();
      expect(mockUserService.authenticate).toHaveBeenCalledWith({});
    });
  });

  describe('follow user', () => {
    it('should follow a user', async () => {
      const user = await controller.follow('', '');
      expect(user).toBeDefined();
      expect(mockUserService.follow).toHaveBeenCalledWith('', '');
    });
  });

  describe('unfollow user', () => {
    it('should unfollow a user', async () => {
      const user = await controller.unfollow('', '');
      expect(user).toBeDefined();
      expect(mockUserService.unFollow).toHaveBeenCalledWith('', '');
    });
  });

  describe('show user', () => {
    it('should show a user', async () => {
      const user = await controller.user('');
      expect(user).toBeDefined();
      expect(mockUserService.userDetails).toHaveBeenCalledWith('');
    });
  });
});
