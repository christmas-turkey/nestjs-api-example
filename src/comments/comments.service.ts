import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentsModel: typeof Comment) {}

  async getAllComments(postId): Promise<Comment[]> {
    const comments = await this.commentsModel.findAll({
      where: postId ? { postId } : {},
      include: { all: true },
    });
    return comments;
  }

  async getCommentById(id: number): Promise<Comment> {
    const comment = await this.commentsModel.findByPk(id, {
      include: { all: true },
    });
    return comment;
  }

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentsModel.create(dto, {
      include: { all: true },
    });
    return comment;
  }

  async updateComment(id: number, dto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentsModel.findByPk(id, {
      include: { all: true },
    });
    await comment.update(dto);
    return comment;
  }

  async deleteComment(id: number): Promise<Comment> {
    const comment = await this.commentsModel.findByPk(id, {
      include: { all: true },
    });
    await comment.destroy();
    return comment;
  }
}
