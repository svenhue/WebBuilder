import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.jwt_secret,
      signOptions: { expiresIn: '2 days' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: 'APP_GUARD', useClass: AuthGuard}],
  exports: [AuthService],

})
export class AuthModule {}
