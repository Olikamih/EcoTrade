import { Module } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreditsController } from './credits.controller';
import { PublicCreditsController } from './public-credits.controller'; // 🔹 importar
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credit } from './credit.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Credit]), AuthModule],
  controllers: [CreditsController, PublicCreditsController], // 🔹 adicionar aqui
  providers: [CreditsService],
  exports: [CreditsService], // 🔹 já está certo
})
export class CreditsModule {}
