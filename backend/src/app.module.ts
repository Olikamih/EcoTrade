import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CreditsModule } from './credits/credits.module';
import { TransactionsModule } from './transactions/transactions.module';
import { User } from './users/user.entity';
import { Credit } from './credits/credit.entity';
import { Transaction } from './transactions/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 1818,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Credit, Transaction],
      synchronize: true, // só para desenvolvimento
    }),
    UsersModule,
    AuthModule,
    CreditsModule,
    TransactionsModule,
  ],
})
export class AppModule {}
