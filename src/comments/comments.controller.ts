import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentsService } from './comments.service';
import {
  Controller,
  Get,
  UseGuards,
  Param,
  Query,
  Post,
  Put,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { Comment } from './comments.model';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Getting all comments' })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get()
  getAllComments(@Query('postId', ParseIntPipe) postId: number) {
    return this.commentsService.getAllComments(postId);
  }

  @ApiOperation({ summary: 'Getting coment by its id' })
  @ApiResponse({ status: 200, type: Comment })
  @Get(':id')
  getCommentById(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.getCommentById(id);
  }

  @ApiOperation({ summary: 'Creating comment' })
  @ApiResponse({ status: 201, type: Comment })
  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() dto: CreateCommentDto) {
    return this.commentsService.createComment(dto);
  }

  @ApiOperation({ summary: 'Updating comment' })
  @ApiResponse({ status: 201, type: Comment })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(id, dto);
  }

  @ApiOperation({ summary: 'Deleting comment' })
  @ApiResponse({ status: 204, type: Comment })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.deleteComment(id);
  }
}
