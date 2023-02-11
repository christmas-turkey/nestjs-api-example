import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Some text', description: 'Content of post' })
  @IsNotEmpty({ message: 'Content must not be empty' })
  readonly content: string;

  @ApiProperty({ example: '123', description: "Author's id" })
  @IsNotEmpty({ message: 'Author id must not be empty' })
  readonly authorId: number;

  @ApiProperty({ example: '12356', description: "Posts's id" })
  @IsNotEmpty({ message: 'Post id must not be empty' })
  readonly postId: number;
}
