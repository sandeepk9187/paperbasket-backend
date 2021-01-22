import { CustomerInterface } from './payment/customer.interface';
export interface UserInterface {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    dateOfBirth: Date;
    phoneNumber: string;
}
export interface UserInterfaceWithStripe {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    dateOfBirth: Date;
    phoneNumber: string;
    stripe?: CustomerInterface;
}
