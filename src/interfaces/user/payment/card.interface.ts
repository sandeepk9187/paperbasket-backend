import { UserInterface } from '../user.interface';

export class CardInterface {
	id: string;
	card: CardDataInterface;
	user?: UserInterface
}

class CardDataInterface {
	brand: string;
	exp_month: number;
	exp_year: number;
	last4: string;
}
