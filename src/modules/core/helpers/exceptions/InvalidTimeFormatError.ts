import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTimeFormatError extends HttpException {
  constructor(message?: string) {
    const errorMessage =
      message || 'Formato de tempo inválido. Por favor, use HH:mm.';
    super(errorMessage, HttpStatus.BAD_REQUEST);
  }
}
