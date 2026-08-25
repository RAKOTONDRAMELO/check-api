import { UnauthorizedException } from '@nestjs/common';

export class InvalidPasswordException extends UnauthorizedException {
  constructor() {
    super({
      message: 'Mot de passe incorrect',
      error: 'INVALID_PASSWORD',
      statusCode: 401,
    });
  }
}
