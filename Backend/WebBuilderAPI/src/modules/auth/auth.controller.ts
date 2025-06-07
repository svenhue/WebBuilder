import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  Req,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { TenantInterceptor } from '../../shared/tenancy/tenant.interceptor';
import { Public } from './decorators/auth.decorators';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(TenantInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: { email: string; password: string }) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
 
}
