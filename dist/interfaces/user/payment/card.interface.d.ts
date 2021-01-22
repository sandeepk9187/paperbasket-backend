import { UserInterface } from '../user.interface';
export declare class CardInterface {
    id: string;
    card: CardDataInterface;
    user?: UserInterface;
}
declare class CardDataInterface {
    brand: string;
    exp_month: number;
    exp_year: number;
    last4: string;
}
export {};
