import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../decorators/public.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
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

  @Get('profile')
  profile(@Request() req: any) {
    return req.user;
  }
}
