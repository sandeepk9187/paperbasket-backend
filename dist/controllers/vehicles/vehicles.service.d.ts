import { Repository } from 'typeorm';
import { UserInterface } from '../../interfaces/user/user.interface';
import { Observable } from 'rxjs';
import { Vehicle } from '../../entities/user/vehicles/vehicle.entity';
import { VehicleInterface } from '../../interfaces/user/vehicle.interface';
export declare class VehiclesService {
    private vehicleRepository;
    constructor(vehicleRepository: Repository<Vehicle>);
    saveVehicle(vehicle: VehicleInterface, user: UserInterface): Observable<Object>;
    getVehicles(user: UserInterface): Observable<Object[]>;
}
