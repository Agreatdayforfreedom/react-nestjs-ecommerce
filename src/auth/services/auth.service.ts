import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user/user.service';
import { PayloadAuth } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(body: any) {
    console.log(body);
    const { username, email }: { username: string; email: string } = body;
    const [user] = await this.userService.findOne(username, email);
    if (user) {
      throw new HttpException('Username or email already has registered', 400);
    }

    const userCreated = await this.userService.create(body);
    return {
      id: userCreated.user.id,
      username: userCreated.user.username,
      role: userCreated.user.role,
      cart: userCreated.cart,
      LIBScredits: user.LIBScredits,
      access_token: this.jwtService.sign({
        id: userCreated.user.id,
        username: userCreated.user.username,
        role: userCreated.user.role,
        LIBScredits: userCreated.user.LIBScredits,
        cart: userCreated.cart,
      }),
    };
  }

  async login(username: string, pass: string) {
    const [user] = await this.userService.findOne(username);
    if (!user || user.password !== pass) {
      throw new HttpException('Username or password are incorrect', 401);
    }
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      cart: user.cart,
      LIBScredits: user.LIBScredits,
      access_token: this.jwtService.sign({
        id: user.id,
        username: user.username,
        role: user.role,
        LIBScredits: user.LIBScredits,
        cart: user.cart,
      }),
    };
  }

  async refreshToken(userReq: PayloadAuth) {
    const [user] = await this.userService.findOneId(userReq.id);
    if (!user) {
      throw new HttpException('Internal server error', 500);
    }
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      cart: user.cart,
      LIBScredits: user.LIBScredits,
      access_token: this.jwtService.sign({
        id: user.id,
        username: user.username,
        role: user.role,
        LIBScredits: user.LIBScredits,
        cart: user.cart,
      }),
    };
  }
}
