import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Credit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  producerId: string;

  @Column('numeric')
  amount: number;

  @Column()
  origin: string;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  generatedAt: Date;

  @Column({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';

  @Column({ nullable: true })
  approvedBy?: string;

  @Column({ nullable: true, type: 'timestamp' })
  approvedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;
}
