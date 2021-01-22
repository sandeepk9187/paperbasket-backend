import { UserInterface } from './user.interface';

export interface VehicleInterface {
  user?: UserInterface;
  make: string;
  type: string;
  year: number;
  transmission: string;
  licensePlate: string;
  state: string;
}
