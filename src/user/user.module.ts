// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service'; // Đảm bảo import AuthService
import { UserSchema } from './user.model';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/auth/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '5m' },
    }),
    JwtModule.register({
      secret: 'REFRESH_SECRET',
      signOptions: { expiresIn: '1d' }, // refreshToken có thời hạn 1 ngày
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, LocalStrategy], // Đảm bảo AuthService được cung cấp ở đây
})
export class UserModule {}
