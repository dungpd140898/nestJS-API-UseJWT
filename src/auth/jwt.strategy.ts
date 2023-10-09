import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Sửa JwtFromRequest thành jwtFromRequest
      ignoreExpiration: false, // Sửa IgnoreExpiration thành ignoreExpiration
      secretOrKey: 'SECRET',
    });
  }
  async validate(payload: any) {
    return {
      _id: payload.sub,
      email: payload.email,
    };
  }
}
