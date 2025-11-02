import { Controller, Post, Patch, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuditService } from './audit.service.js';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';

@Controller('audit')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Post()
  @Roles('auditor')
  create(@Body() dto: CreateAuditDto, @Request() req) {
    return this.auditService.create(dto, req.user.userId);
  }

  @Patch(':id')
  @Roles('auditor')
  update(@Param('id') id: string, @Body() dto: UpdateAuditDto) {
    return this.auditService.update(id, dto);
  }

  @Get()
  @Roles('auditor', 'admin')
  findAll() {
    return this.auditService.findAll();
  }
}
