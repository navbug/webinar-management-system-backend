import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    //Default Internal server error
    let status = HttpStatus.INTERNAL_SERVER_ERROR; //500
    let message = 'Internal server error';
    let errorCode: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || message;
        errorCode = (exceptionResponse as any).errorCode;
      }
    } else if (exception.code === 11000) {
      // Handle MongoDB duplicate key error
      status = HttpStatus.CONFLICT; //409
      message = 'Email already registered for this webinar';
      errorCode = 'DUPLICATE_REGISTRATION';
    } else if (exception.name === 'CastError') {
      // Handle invalid MongoDB ObjectId
      status = HttpStatus.BAD_REQUEST; //400
      message = 'Invalid ID format';
      errorCode = 'INVALID_ID';
    } else {
      message = exception.message || message;
    }

    response.status(status).json({
      success: false,
      message,
      ...(errorCode && { errorCode }),
    });
  }
}
