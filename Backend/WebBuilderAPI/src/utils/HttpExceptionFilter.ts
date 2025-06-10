
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomErrorMessageResponse } from './CustomErrorMessageResponse';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<CustomErrorMessageResponse>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const message = exception.getResponse()['message'] != undefined ? exception.getResponse()['message'] : 'Internal Server Error' 
    response
      .status(status)
      .json({
        message: message,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
