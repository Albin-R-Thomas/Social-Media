import { Body, Controller, Headers, Post } from '@nestjs/common';
import { Delete, Get, Param } from '@nestjs/common/decorators';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post('/posts')
  async insertUser(@Body() postBody, @Headers('auth-token') token) {
    return await this.postService.insertPost(postBody, token);
  }

  @Delete('/posts/:id')
  async deletePost(@Param('id') id, @Headers('auth-token') token) {
    return await this.postService.deletePost(id, token);
  }

  @Post('/like/:id')
  async likePost(@Param('id') id, @Headers('auth-token') token) {
    return await this.postService.likePost(id, token);
  }

  @Post('/unlike/:id')
  async unlikePost(@Param('id') id, @Headers('auth-token') token) {
    return await this.postService.unlikePost(id, token);
  }

  @Post('/comment/:id')
  async commentOnPost(
    @Param('id') id,
    @Headers('auth-token') token,
    @Body() commentBody,
  ) {
    return await this.postService.comment(id, token, commentBody);
  }

  @Get('/posts/:id')
  async getPosts(@Param('id') id) {
    return await this.postService.getPosts(id);
  }

  @Get('all_posts')
  async getAllPosts(@Headers('auth-token') token) {
    return await this.postService.getAllPosts(token);
  }
}
