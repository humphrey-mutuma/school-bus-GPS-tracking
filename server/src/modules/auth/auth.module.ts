import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './token.service';
import { SharedModule } from 'src/shared/shared.module';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseModule } from 'src/db/db.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use environment variables for sensitive data
      signOptions: { expiresIn: '7d' }, // Token expiration time
    }),
    DatabaseModule,
    SharedModule,
  ],
  providers: [AuthService, TokenService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
