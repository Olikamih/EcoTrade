import { IsUUID, IsOptional, IsEnum, IsString } from 'class-validator';

export class CreateAuditDto {
  @IsUUID()
  creditId: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsEnum(['pending', 'approved', 'rejected'])
  status: 'pending' | 'approved' | 'rejected';
}
