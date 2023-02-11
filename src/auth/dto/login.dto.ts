import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'john@gmail.com', description: "User's email" })
  @IsNotEmpty({ message: 'Email must not be empty' })
  readonly email: string;

  @ApiProperty({ example: 'StrongPassword123', description: "User's password" })
  @IsNotEmpty({ message: 'Password must not be empty' })
  readonly password: string;
}
