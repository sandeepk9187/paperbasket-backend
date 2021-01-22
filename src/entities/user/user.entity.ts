import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';

import { Address } from './address/address.entity';
import { Vehicle } from './vehicles/vehicle.entity';
import { ProfileImage } from './profileImage/profile.image.entity';
import { StripeCustomer } from './stripeCustomer/stripeCustomer.entity';
import { StripeSources } from './stripeCustomer/stripeSources.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @Column()
  password: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: false })
  phoneVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(type => ProfileImage, profileImage => profileImage.user, {
    cascade: true
  })
  @JoinColumn()
  profilePic: ProfileImage

  @OneToMany(type => Address, address => address.user, {
    cascade: true
  })
  address: Address[]

  @OneToMany(type => Vehicle, vehicle => vehicle.user, {
    cascade: true
  })
  vehicle: Vehicle[]

  @OneToOne(type => StripeCustomer, stripe => stripe.user, {
    cascade: true
  })
  stripe: StripeCustomer

	@OneToMany(type =>  StripeSources, source => source.user)
	cards: StripeSources[]
}

