import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt"; // Sử dụng 'passport-jwt' thay vì 'passport-local'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Sửa JwtFromRequest thành jwtFromRequest
            ignoreExpiration: false, // Sửa IgnoreExpiration thành ignoreExpiration
            secretOrKey: 'SECRET'
        })
    }
    async validate(payload: any){
        return {
            id: payload.sub,
            name: payload.name,
        };
    }
}
