import { User } from '../user.entity';
export declare class Address {
    id: number;
    street: string;
    address: string;
    defaultAddress: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: User;
}
