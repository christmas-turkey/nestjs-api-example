import { IsEmail, Matches, MinLength, IsNotEmpty, IsUUID } from 'class-validator';
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

  @ApiProperty({ example: '3d603c3e-c1af-11ed-afa1-0242ac120002', description: "User's email verification id" })
  @IsNotEmpty({ message: 'Verification id must not be empty' })
  @IsUUID(null, {message: "Invalid verification id"})
  readonly verificationId: string;
}
