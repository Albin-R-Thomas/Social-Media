import { Body, Controller, Post } from '@nestjs/common';
import { Get, Headers, Param } from '@nestjs/common/decorators';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/user')
  async insertUser(@Body() userBody) {
    return await this.userService.insertUser(userBody);
  }
  @Post('/authenticate')
  async authenticate(@Body() userBody) {
    return await this.userService.authenticate(userBody);
  }

  @Post('/follow/:id')
  async follow(@Param('id') id, @Headers('auth-token') token) {
    return await this.userService.follow(id, token);
  }

  @Post('/unfollow/:id')
  async unfollow(@Param('id') id, @Headers('auth-token') token) {
    return await this.userService.unFollow(id, token);
  }

  @Get('/user')
  async user(@Headers('auth-token') token) {
    return await this.userService.userDetails(token);
  }
}
