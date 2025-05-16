import { Module } from '@nestjs/common';

import { UserModule } from '@/models/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers/auth.controller';

import { BlockedDomainsService } from '@/common/services/blocked-domains.service';
import { GoogleAuthService } from './services/google-auth.service';
import { LocalAuthService } from './services/local-auth.service';

import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h', algorithm: 'HS256' },
      }),
    }),
    PassportModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    GoogleAuthService,
    GoogleStrategy,
    LocalAuthService,
    LocalStrategy,
    JwtStrategy,
    BlockedDomainsService,
  ],
})
export class AuthModule { }
