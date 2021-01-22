import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInterface } from '../../interfaces/user/user.interface';
import { from, Observable } from 'rxjs';
import { Vehicle } from '../../entities/user/vehicles/vehicle.entity';
import { VehicleInterface } from '../../interfaces/user/vehicle.interface';

@Injectable()
export class VehiclesService {
  constructor(@InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>) {
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  saveVehicle(vehicle: VehicleInterface, user: UserInterface): Observable<Object> {
    vehicle.user = user;
    return from(this.vehicleRepository.save(vehicle));
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  getVehicles(user: UserInterface): Observable<Object[]> {
    return from(this.vehicleRepository.find({
      where: {
        user: user.id,
      }, relations: ['user'],
    }));
  }
}
