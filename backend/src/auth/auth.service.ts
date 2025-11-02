import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    // 🔹 Aceita qualquer hash bcrypt ($2a$, $2b$, $2y$)
    if (/^\$2[aby]\$/.test(user.password)) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return null;
    } else {
      // 🔹 Se ainda houver senha em texto puro
      if (user.password !== password) return null;
    }

    const { password: _pwd, ...result } = user;
    return result;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(data: { email: string; password: string; role?: string }) {
    const existing = await this.usersService.findByEmail(data.email);
    if (existing) {
      throw new UnauthorizedException('Usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.create({
      ...data,
      password: hashedPassword,
      role: data.role || 'user',
    });

    const { password, ...result } = user;
    return result;
  }
}
