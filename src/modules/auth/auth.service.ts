import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email:string, pass:string) {
    const user = await this.usersService.findByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(firstName: string, email:string, pass:string) {
      const user = await this.usersService.findByEmail(email);
      if (user) {
        throw new BadRequestException('User already register');
      } else {
        const payload = { email: email };
        const userCreated = await this.usersService.create(firstName, email, pass)
        if (userCreated) {
          return {
            access_token: await this.jwtService.signAsync(payload),
          };
        } else {
          throw new InternalServerErrorException('Error by user register');
        }
      }
    }
}