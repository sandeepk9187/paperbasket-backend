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
export class StripeSources {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	payment_id: string;

	@Column()
	exp_month: number;

	@Column()
	exp_year: number;

	@Column()
	last4: string;

	@Column()
	brand: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;

	@ManyToOne(type => User, user => user.cards  )
	user: User
}
