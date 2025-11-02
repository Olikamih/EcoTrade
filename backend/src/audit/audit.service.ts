import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audit } from './audit.entity';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { Transaction } from '../transactions/transaction.entity';
import { User } from '../users/user.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(Audit)
    private auditRepo: Repository<Audit>,
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(dto: CreateAuditDto, auditorId: number) {
    const credit = await this.transactionRepo.findOne({ where: { id: dto.creditId } });
    if (!credit) throw new NotFoundException('Crédito não encontrado');

    const audit = this.auditRepo.create({
      credit,
      auditor: { id: auditorId } as User,
      comment: dto.comment,
      status: dto.status,
    });

    return this.auditRepo.save(audit);
  }

  async update(id: string, dto: UpdateAuditDto) {
    const audit = await this.auditRepo.findOne({ where: { id } });
    if (!audit) throw new NotFoundException('Registro de auditoria não encontrado');

    Object.assign(audit, dto);
    return this.auditRepo.save(audit);
  }

  findAll() {
    return this.auditRepo.find({ relations: ['credit', 'auditor'] });
  }
}
