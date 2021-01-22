import { BadRequestException, Injectable } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { InjectStripe } from 'nestjs-stripe';
import { Stripe } from 'stripe';
import { parse } from 'flatted';
import { CustomerStripeInterface } from '../../interfaces/user/customer-stripe.interface';
import { CreatePaymentMethodInterface } from 'src/interfaces/user/createPaymentMethod.interface';
import {
  PaymentIdInterface,
  PaymentIdInterfaceDelete,
} from '../../interfaces/user/payment/PaymentId.interface';
import { CustomerInterface } from '../../interfaces/user/payment/customer.interface';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { SourceService } from './services/source.service';

@Injectable()
export class StripeService {

  constructor(@InjectStripe() private readonly stripeClient: Stripe, private sourceService: SourceService) {
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  createCustomer(customer: CustomerStripeInterface): Observable<Object> {
    const { email, userId } = customer
    return from(this.stripeClient.customers.create({
      email,
      metadata: {
        userId: userId
      }
    }))
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  createPaymentMethod(cardData: CreatePaymentMethodInterface): Observable<Object> {
    const { number, exp_month, exp_year, cvc  } = cardData
    return from(this.stripeClient.paymentMethods.create({
      type: 'card',
      card: {
        number,
        exp_month,
        exp_year,
        cvc
      }
    }))
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  attachPaymentMethod(stripeData: PaymentIdInterface, customer: CustomerInterface): Observable<Object> {
    stripeData.customer_id = customer.customer
    return from(this.stripeClient.paymentMethods.attach(stripeData.payment_id, {
      customer: stripeData.customer_id
    }))
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  detachCard(paymentId: PaymentIdInterfaceDelete): Observable<Object> {
    return from(this.stripeClient.paymentMethods.detach(paymentId.payment_id)).pipe(
      switchMap(card => {
        return this.sourceService.deleteSource(paymentId)
      }),
      catchError(err => {
        throw new BadRequestException(err.message)
      })
    )
  }

	// eslint-disable-next-line @typescript-eslint/ban-types
  listOfPaymentMethods(customer: CustomerInterface): Observable<Object> {
  	return from(this.stripeClient.paymentMethods.list({
			customer: customer.customer,
			type: "card"
		}))
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	createPaymentIntentAndCharge(): Observable<Object> {
  	return from(this.stripeClient.paymentIntents.create({
			amount: 100,
			customer: "",
			payment_method: "",
			currency: 'usd',
			off_session: true,
			confirm: true
		}))
	}
}
