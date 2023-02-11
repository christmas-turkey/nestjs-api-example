import { Post } from 'src/posts/posts.model';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { PostsService } from './posts.service';
import {
  Controller,
  Get,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Post as PostMethod,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Getting all posts' })
  @ApiResponse({ status: 200, type: [Post] })
  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @ApiOperation({ summary: 'Getting post by its id' })
  @ApiResponse({ status: 200, type: Post })
  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @ApiOperation({ summary: 'Creating post' })
  @ApiResponse({ status: 201, type: Post })
  @UseGuards(JwtAuthGuard)
  @PostMethod()
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Body() dto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.postsService.createPost(dto, image);
  }

  @ApiOperation({ summary: 'Updating post' })
  @ApiResponse({ status: 201, type: Post })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.postsService.updatePost(id, dto, image);
  }

  @ApiOperation({ summary: 'Deleting post' })
  @ApiResponse({ status: 204, type: Post })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
