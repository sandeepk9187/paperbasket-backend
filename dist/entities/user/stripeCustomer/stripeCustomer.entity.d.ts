import { User } from '../user.entity';
export declare class StripeCustomer {
    id: number;
    customer: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: User;
}
