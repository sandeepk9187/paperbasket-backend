import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne, JoinColumn, OneToOne,
} from 'typeorm';
import { User } from '../user.entity';

@Entity()
export class StripeCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  customer: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(type => User, user => user.stripe  )
  @JoinColumn()
  user: User
}
