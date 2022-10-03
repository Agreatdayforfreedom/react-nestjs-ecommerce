import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { User } from '../decorators/user.decorator';
import { PayloadAuth } from '../models/token.model';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() body: any) {
    return this.authService.signup(body);
  }

  @Public()
  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.username, body.password);
  }

  @Get('refresh')
  refreshToken(@User() userReq: PayloadAuth) {
    return this.authService.refreshToken(userReq);
  }

  @Get('profile')
  profile(@User() user: PayloadAuth) {
    return user;
  }
}
