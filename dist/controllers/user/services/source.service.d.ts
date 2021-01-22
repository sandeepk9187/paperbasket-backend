import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { StripeSources } from '../../../entities/user/stripeCustomer/stripeSources.entity';
import { CardInterface } from '../../../interfaces/user/payment/card.interface';
import { UserInterface } from '../../../interfaces/user/user.interface';
import { PaymentIdInterfaceDelete } from '../../../interfaces/user/payment/PaymentId.interface';
export declare class SourceService {
    private sourceRepository;
    constructor(sourceRepository: Repository<StripeSources>);
    saveSource(cardData: CardInterface, user: UserInterface): Observable<any>;
    listOfSources(user: UserInterface): Observable<any>;
    deleteSource(paymentId: PaymentIdInterfaceDelete): Observable<any>;
}
