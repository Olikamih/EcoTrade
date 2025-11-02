// credits.controller.ts
import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { Credit } from './credit.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('credits')
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'empresa')
  @Post()
  create(@Body() creditData: Partial<Credit>, @Request() req: any) {
    const producerId = req.user.userId;
    return this.creditsService.create({ ...creditData, producerId });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.creditsService.findAll();
  }

  // 🔹 Novo endpoint público
  @Get('public-credits')
  async getPublicCredits() {
    const credits = await this.creditsService.findAll();
    return credits.map(c => ({
      id: c.id,
      producerId: c.producerId,
      producerName: c.origin || 'Produtor desconhecido', // se origin identifica o produtor
      quantity: Number(c.amount), // converte numeric para number
      date: c.generatedAt?.toISOString() ?? new Date().toISOString(),
      approved: c.status === 'approved',
    }));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/approve')
  approve(@Param('id') id: string, @Request() req: any) {
    const adminId = String(req.user.userId);
    return this.creditsService.approve(id, adminId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/reject')
  reject(@Param('id') id: string, @Request() req: any) {
    const adminId = String(req.user.userId);
    return this.creditsService.reject(id, adminId);
  }
}
