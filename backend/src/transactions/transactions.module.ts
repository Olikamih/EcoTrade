import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './transaction.entity';
import { User } from '../users/user.entity'; // import do User

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, User]), // <<< aqui adicionamos User
  ],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
