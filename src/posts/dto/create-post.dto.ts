import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Title', description: 'Title of post' })
  @IsNotEmpty({ message: 'Title must not be empty' })
  readonly title: string;

  @ApiProperty({ example: 'Some content', description: 'Content of post' })
  @IsNotEmpty({ message: 'Content must not be empty' })
  readonly content: string;

  @ApiProperty({ example: '123', description: "Author's id" })
  @IsNotEmpty({ message: 'User id must not be empty' })
  readonly userId: number;
}
