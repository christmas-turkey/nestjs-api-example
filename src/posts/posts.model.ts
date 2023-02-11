import { ApiProperty } from '@nestjs/swagger';
import { User } from './../users/users.model';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Comment } from 'src/comments/comments.model';

interface PostAttributes {
  title: string;
  content: string;
  image: string;
  userId: number;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostAttributes> {
  @ApiProperty({ example: '1', description: "Post's unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Title', description: 'Title of post' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Some content', description: 'Content of post' })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ApiProperty({ description: 'Image of post' })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ example: '123', description: "Author's id" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({ type: () => User, description: 'Author of post' })
  @BelongsTo(() => User)
  author: User;

  @ApiProperty({
    type: () => [Comment],
    description: 'List of comments belonging to the post',
  })
  @HasMany(() => Comment)
  comments: Comment[];
}
