import { Controller, Get } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { PublicCreditDto } from './dto/public-credit.dto';

@Controller('public-credits')
export class PublicCreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Get()
  async findAll(): Promise<PublicCreditDto[]> {
    const credits = await this.creditsService.findAll();
    return credits.map(c => ({
      id: c.id,
      amount: Number(c.amount),
      status: c.status,
      generatedAt: c.generatedAt,
    }));
  }
}
