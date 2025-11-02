import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  // Todos logados podem criar transações (user e empresa)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'empresa')
  create(@Body() transactionData: CreateTransactionDto) {
    transactionData.buyerId = Number(transactionData.buyerId);
    transactionData.producerId = Number(transactionData.producerId);
    transactionData.amount = Number(transactionData.amount);

    return this.transactionsService.create(transactionData);
  }

  @Get()
  @UseGuards(JwtAuthGuard) // todos logados podem ver transações
  findAll() {
    return this.transactionsService.findAll();
  }

  // Apenas admin pode alterar status de compra
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'pending' | 'completed' | 'failed',
  ) {
    return this.transactionsService.updateStatus(id, status);
  }
}
