import { ApiProperty } from '@nestjs/swagger';
import { User } from './../users/users.model';
import {
  Model,
  Column,
  BelongsTo,
  ForeignKey,
  DataType,
  Table,
} from 'sequelize-typescript';
import { Post } from 'src/posts/posts.model';

interface CommentAttributes {
  content: string;
  authorId: number;
  postId: number;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentAttributes> {
  @ApiProperty({ example: '1', description: "Comment's unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Some text', description: 'Content of post' })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ApiProperty({ example: '123', description: "Author's id" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  authorId: number;

  @ApiProperty({ example: '12356', description: "Posts's id" })
  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER, allowNull: false })
  postId: number;

  @ApiProperty({ type: () => User, description: 'Author of comment' })
  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ type: () => Post, description: "Comment's post" })
  @BelongsTo(() => Post)
  post: Post;
}
