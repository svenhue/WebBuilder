import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';

// Core modules
import { DatabaseModule } from './shared/database/database.module';
import { TenancyModule } from './shared/tenancy/tenancy.module';
import { AuditingModule } from './shared/database/auditing/auditing.module';

// Feature modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { GitlabModule } from './modules/gitlab/gitlab.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),


    // Rate limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get('RATE_LIMIT_TTL') || 60,
          limit: configService.get('RATE_LIMIT_LIMIT') || 100,
        },
      ],
      inject: [ConfigService],
    }),

    // Caching
    CacheModule.register({
      isGlobal: true,
      ttl: 300, // 5 minutes
    }),

    // Core modules
    DatabaseModule,
    TenancyModule,
    AuditingModule,

    // Feature modules
    AuthModule,
    UsersModule,
    PermissionsModule,
    ApplicationsModule,
    GitlabModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
