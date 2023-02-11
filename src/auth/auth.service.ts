import { User } from './../users/users.model';
import { UsersService } from './../users/users.service';
import { LoginDto } from './dto/login.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { JwtService } from '@nestjs/jwt/dist';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    if (!user) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordsMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordsMatch) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.generateToken(user);
  }

  async register(dto: RegisterDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    if (user) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const createdUser = await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
    });
    return this.generateToken(createdUser);
  }

  private generateToken(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      posts: user.posts,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
