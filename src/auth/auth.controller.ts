import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Logging in user' })
  @ApiResponse({ status: 200 })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Registering user' })
  @ApiResponse({ status: 200 })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Verifying user' })
  @ApiResponse({ status: 200 })
  @Get('/verify/:verificationid')
  verify(@Param("verificationid") verificationid: string) {
    return this.authService.verify(verificationid)
  }
}
