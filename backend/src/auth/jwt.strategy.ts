import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecret',
    });
  }

  async validate(payload: any) {
    
    console.log('JWT Secret usado:', process.env.JWT_SECRET || 'supersecret');

    // Retorna dados que estarão disponíveis em req.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
