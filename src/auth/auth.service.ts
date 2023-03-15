import { User } from './../users/users.model';
import { UsersService } from './../users/users.service';
import { LoginDto } from './dto/login.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { JwtService } from '@nestjs/jwt/dist';
import {v4} from "uuid"
import { RegisterDto } from './dto/register.dto';
import { MailerService } from '@nestjs-modules/mailer/dist';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService
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

    const verificationId = v4()
    const verificationLink = `http://${process.env.HOST}:${process.env.PORT}/auth/verify/${verificationId}`
    const createdUser = await this.usersService.createUser({
      ...dto,
      verificationId,
      password: hashedPassword,
    });
    this.mailerService.sendMail({
      from: "nestjs.api.mailer@gmail.com",
      to: dto.email,
      subject: "Verify your account",
      html: `
        <p>Verify your account using this link: <a href="${verificationLink}">${verificationLink}</a></p>
      `
    })

    return this.generateToken(createdUser);
  }

  async verify(verificationId: string) {
    const user = await this.usersService.getUserByverificationId(verificationId)

    if (!user) {
      throw new HttpException("Invalid verification link", HttpStatus.BAD_REQUEST)
    }

    user.isVerified = true;
    await user.save()

    return {message: "Verified successfully!"}
  }

  private generateToken(user: User) {
    const payload = {
      id: user.id,
      isVerified: user.isVerified,
      username: user.username,
      email: user.email,
      posts: user.posts,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
