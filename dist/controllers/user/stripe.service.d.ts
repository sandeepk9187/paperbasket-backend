import { Observable } from 'rxjs';
import { Stripe } from 'stripe';
import { CustomerStripeInterface } from '../../interfaces/user/customer-stripe.interface';
import { CreatePaymentMethodInterface } from 'src/interfaces/user/createPaymentMethod.interface';
import { PaymentIdInterface, PaymentIdInterfaceDelete } from '../../interfaces/user/payment/PaymentId.interface';
import { CustomerInterface } from '../../interfaces/user/payment/customer.interface';
import { SourceService } from './services/source.service';
export declare class StripeService {
    private readonly stripeClient;
    private sourceService;
    constructor(stripeClient: Stripe, sourceService: SourceService);
    createCustomer(customer: CustomerStripeInterface): Observable<Object>;
    createPaymentMethod(cardData: CreatePaymentMethodInterface): Observable<Object>;
    attachPaymentMethod(stripeData: PaymentIdInterface, customer: CustomerInterface): Observable<Object>;
    detachCard(paymentId: PaymentIdInterfaceDelete): Observable<Object>;
    listOfPaymentMethods(customer: CustomerInterface): Observable<Object>;
    createPaymentIntentAndCharge(): Observable<Object>;
}
