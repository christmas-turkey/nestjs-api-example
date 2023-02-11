import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Post } from 'src/posts/posts.model';
import { ApiProperty } from '@nestjs/swagger';

interface UserAttributes {
  username: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserAttributes> {
  @ApiProperty({ example: '1', description: "User's unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John', description: "User's name" })
  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @ApiProperty({ example: 'john@gmail.com', description: "User's email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'StrongPassword123', description: "User's password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    type: () => [Post],
    description: 'List of posts created by user',
  })
  @HasMany(() => Post)
  posts: Post[];
}
