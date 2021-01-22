import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vehicle } from '../vehicles/vehicle.entity';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  pickLocation: string

  @Column()
  destination: string

  @Column()
  numberOfGuests: number

  @Column()
  numberOfHours: number

  @Column()
  pickDate: Date

  @Column()
  pickTime: Date

  @Column({ default: false })
  completed: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // @OneToOne(type => Vehicle, vehicle => vehicle.id)
  // @JoinColumn({ name: 'vehicle_id' })
  // vehicle: Vehicle

}
