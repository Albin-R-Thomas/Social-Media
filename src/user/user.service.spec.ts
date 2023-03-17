import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { mockUser } from './mock-data/mock-data';
import { UserService } from './user.service';

describe('user service', () => {
  let service: UserService;
  let mockPrismaService = {
    user: {
      create: jest.fn().mockResolvedValue({}),
      findUniqueOrThrow: jest.fn().mockResolvedValue({}),
      findUnique: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
    },
  };
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();
    service = module.get<UserService>(UserService);
  });
  it('should be defined', async () => {
    expect(service).toBeDefined();
  });
  describe('insertUser', () => {
    it('should insert a new user', async () => {
      const user = await service.insertUser({ password: 'd' });
      expect(user).toBeDefined();
      expect(mockPrismaService.user.create).toBeCalledTimes(1);
    });
    it('should throw an error', async () => {
      jest.spyOn(mockPrismaService.user, 'create').mockRejectedValue('');
      try {
        const user = await service.insertUser({ password: 'd' });
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPrismaService.user.create).toBeCalledWith(mockUser);
      }
    });
  });

  describe('authenticate', () => {
    it('should authenticate a user', async () => {
      const user = await service.authenticate({ password: 'd' });
      expect(user).toBeDefined();
      expect(mockPrismaService.user.findUniqueOrThrow).toBeCalledTimes(1);
    });
    it('should throw an error', async () => {
      jest
        .spyOn(mockPrismaService.user, 'findUniqueOrThrow')
        .mockRejectedValue('');
      try {
        const user = await service.authenticate({ password: 'd' });
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPrismaService.user.findUniqueOrThrow).toBeCalledWith(
          mockUser,
        );
      }
    });
  });

  describe('follow', () => {
    it('should follow a user', async () => {
      const user = await service.follow('', mockUser.data.token);
      expect(user).toBeDefined();
      expect(mockPrismaService.user.findUnique).toBeCalledTimes(2);
      expect(mockPrismaService.user.update).toBeCalledTimes(2);
    });
    it('should throw an error', async () => {
      jest.spyOn(mockPrismaService.user, 'update').mockRejectedValue('');
      try {
        const user = await service.follow('', mockUser.data.token);
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPrismaService.user.update).toBeCalledWith(mockUser);
      }
    });
  });

  describe('unfollow', () => {
    it('should unfollow a user', async () => {
      const user = await service.unFollow('', mockUser.data.token);
      expect(user).toBeDefined();
      expect(mockPrismaService.user.findUnique).toBeCalledTimes(6);
      expect(mockPrismaService.user.update).toBeCalledTimes(4);
    });
    it('should throw an error', async () => {
      jest.spyOn(mockPrismaService.user, 'update').mockRejectedValue('');
      try {
        const user = await service.unFollow('', mockUser.data.token);
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPrismaService.user.update).toBeCalledWith(mockUser);
      }
    });
  });

  describe('userDetails', () => {
    it('should userDetails a user', async () => {
      const user = await service.userDetails(mockUser.data.token);
      expect(user).toBeDefined();
      expect(mockPrismaService.user.findUnique).toBeCalledTimes(9);
    });
    it('should throw an error', async () => {
      jest.spyOn(mockPrismaService.user, 'findUnique').mockRejectedValue('');
      try {
        const user = await service.userDetails(mockUser.data.token);
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockPrismaService.user.findUnique).toBeCalledWith(mockUser);
      }
    });
  });
});
