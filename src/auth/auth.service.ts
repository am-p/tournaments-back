import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  // This part is for the Passport thing that I copied from the Documentation and it use by local.strategy
  async validateUser(username: string, pass: string): Promise<any> {
   
    const user = await this.usersService.findOne(username);
    if (user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
