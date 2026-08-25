import { NotFoundException } from '@nestjs/common';

export class EmailNotFoundException extends NotFoundException {
  constructor(email: string) {
    super({
      message: `L'email ${email} n'existe pas`,
      error: 'EMAIL_NOT_FOUND',
      statusCode: 404,
    });
  }
}
