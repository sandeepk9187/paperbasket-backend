import { UserInterface } from '../user.interface';
export declare class SaveCardInterface {
    payment_id: string;
    brand: string;
    exp_month: number;
    exp_year: number;
    last4: string;
    user?: UserInterface;
}
export declare class DeleteCardInterface {
    id: number;
}
