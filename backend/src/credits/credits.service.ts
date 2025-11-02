import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credit } from './credit.entity';

@Injectable()
export class CreditsService {
  constructor(
    @InjectRepository(Credit)
    private creditsRepository: Repository<Credit>,
  ) {}

  create(creditData: Partial<Credit>) {
    const credit = this.creditsRepository.create(creditData);
    return this.creditsRepository.save(credit);
  }

  findAll() {
    return this.creditsRepository.find();
  }

  async approve(id: string, adminId: string) {
    const credit = await this.creditsRepository.findOne({ where: { id } });
    if (!credit) throw new NotFoundException('Crédito não encontrado');

    credit.status = 'approved';
    credit.approvedBy = adminId;
    credit.approvedAt = new Date();

    return this.creditsRepository.save(credit);
  }

  async reject(id: string, adminId: string) {
    const credit = await this.creditsRepository.findOne({ where: { id } });
    if (!credit) throw new NotFoundException('Crédito não encontrado');

    credit.status = 'rejected';
    credit.approvedBy = adminId;
    credit.approvedAt = new Date();

    return this.creditsRepository.save(credit);
  }
}
