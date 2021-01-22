import { Module } from '@nestjs/common';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from '../../entities/user/rides/ride.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ride]), UserModule],
  controllers: [RidesController],
  providers: [RidesService]
})
export class RidesModule {}
