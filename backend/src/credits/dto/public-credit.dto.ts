export class PublicCreditDto {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  generatedAt: Date;
}
