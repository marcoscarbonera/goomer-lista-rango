import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { InvalidTimeFormatError } from '../exceptions/InvalidTimeFormatError';

@Catch(InvalidTimeFormatError)
export class InvalidTimeFormatFilter implements ExceptionFilter {
  catch(exception: InvalidTimeFormatError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}
