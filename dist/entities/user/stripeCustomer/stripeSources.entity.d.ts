import { User } from '../user.entity';
export declare class StripeSources {
    id: number;
    payment_id: string;
    exp_month: number;
    exp_year: number;
    last4: string;
    brand: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: User;
}
