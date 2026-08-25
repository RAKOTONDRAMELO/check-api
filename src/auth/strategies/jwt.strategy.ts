import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}
export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET_KEY',
    });
  }

  validate(payload: JwtPayload): AuthenticatedUser {
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
  }
}
