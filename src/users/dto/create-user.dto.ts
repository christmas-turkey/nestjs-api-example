import { IsEmail, Matches, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: "User's name" })
  @IsNotEmpty({ message: 'Name must not be empty' })
  readonly username: string;

  @ApiProperty({ example: 'john@gmail.com', description: "User's email" })
  @IsNotEmpty({ message: 'Email must not be empty' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({ example: 'StrongPassword123', description: "User's password" })
  @IsNotEmpty({ message: 'Password must not be empty' })
  @MinLength(8, { message: 'Password must contain at least 8 characters' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  readonly password: string;
}
