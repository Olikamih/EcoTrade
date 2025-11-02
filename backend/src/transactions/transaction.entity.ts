import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: ['pending','completed','failed'], default: 'pending' })
  status: 'pending' | 'completed' | 'failed';

  // Colunas FK
  @Column()
  buyerId: number;

  @Column()
  producerId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'buyerId' })
  buyer: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'producerId' })
  producer: User;
}
