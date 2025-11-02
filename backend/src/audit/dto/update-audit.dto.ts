export class UpdateAuditDto {
  creditId: string;           // ID do crédito auditado
  status: 'approved' | 'rejected';  // Status definido pelo auditor
  comment?: string;           // Comentário opcional do auditor
}
