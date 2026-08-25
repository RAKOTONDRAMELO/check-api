import {
  Injectable,
  // UnauthorizedException,
  //   BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
// import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { EmailNotFoundException } from 'src/common/exceptions/email-not-found.exception';
import { InvalidPasswordException } from 'src/common/exceptions/invalide-password.exception';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    // private usersService: UsersService,
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (!user) {
      throw new EmailNotFoundException(dto.email);
    }

    const match = await bcrypt.compare(dto.password, user.password);

    if (!match) throw new InvalidPasswordException();
    if (!user.acces) {
      throw new Error('User access is disabled');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { userId: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload);

    // const refreshToken = this.jwtService.sign(payload, {
    //   expiresIn: '7d',
    // });
    return {
      access_token: accessToken,
      // refresh_token: refreshToken,
    };
  }
  // async updateRefreshToken(userId: number, refreshToken: string) {
  //   const hash = await bcrypt.hash(refreshToken, 10);
  //   await this.userRepository.update(userId, { hashedRefreshToken: hash });
  // }

  // setCookies(res: Response, tokens: any) {
  //   res.cookie('access_token', tokens.access_token, {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'lax',
  //     maxAge: 15 * 60 * 1000,
  //   });

  //   res.cookie('refresh_token', tokens.refresh_token, {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'lax',
  //     maxAge: 7 * 24 * 60 * 60 * 1000,
  //   });
  // }
}
