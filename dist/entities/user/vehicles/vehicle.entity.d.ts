import { User } from '../user.entity';
export declare class Vehicle {
    id: number;
    make: string;
    type: string;
    year: number;
    transmission: string;
    licensePlate: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: User;
}
