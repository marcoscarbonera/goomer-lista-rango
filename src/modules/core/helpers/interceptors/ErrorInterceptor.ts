import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BadRequestException) {
          throw error; // Se já for um erro de requisição, apenas relance
        } else {
          // Lidar com outros tipos de erros aqui
          const message =
            error instanceof Error ? error.message : 'Erro interno do servidor';
          throw new BadRequestException(message);
        }
      }),
    );
  }
}
