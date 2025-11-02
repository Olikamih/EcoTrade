import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from '../users/user.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Criar transação
  async create(data: CreateTransactionDto) {
    const buyer = await this.usersRepository.findOne({ where: { id: data.buyerId } });
    const producer = await this.usersRepository.findOne({ where: { id: data.producerId } });

    if (!buyer || !producer) {
      throw new BadRequestException('Comprador ou produtor não encontrado');
    }

    const transaction = this.transactionsRepository.create({
      buyerId: buyer.id,
      producerId: producer.id,
      amount: data.amount,
      status: 'pending',
    });

    return this.transactionsRepository.save(transaction);
  }

  // Listar todas as transações
  findAll() {
    return this.transactionsRepository.find({ relations: ['buyer', 'producer'] });
  }

  // Atualizar status
  async updateStatus(id: string, status: 'pending' | 'completed' | 'failed') {
    const tx = await this.transactionsRepository.findOne({
      where: { id },
      relations: ['buyer', 'producer'],
    });

    if (!tx) throw new NotFoundException('Transação não encontrada');

    tx.status = status;
    return this.transactionsRepository.save(tx);
  }
}
