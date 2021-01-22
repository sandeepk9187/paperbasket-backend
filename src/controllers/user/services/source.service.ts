import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { from, Observable } from 'rxjs';
import { StripeSources } from '../../../entities/user/stripeCustomer/stripeSources.entity';
import { CardInterface } from '../../../interfaces/user/payment/card.interface';
import { UserInterface } from '../../../interfaces/user/user.interface';
import {
  DeleteCardInterface,
  SaveCardInterface,
} from '../../../interfaces/user/payment/saveCard.interface';
import {
  PaymentIdInterface,
  PaymentIdInterfaceDelete,
} from '../../../interfaces/user/payment/PaymentId.interface';
import { switchMap, map } from 'rxjs/operators';
import { UserIdInterface } from '../../../interfaces/user/userId.interface';

@Injectable()
export class SourceService {
  constructor(
    @InjectRepository(StripeSources)
    private sourceRepository: Repository<StripeSources>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  saveSource(cardData: CardInterface, user: UserInterface): Observable<any> {
    cardData.user = user;
    const csData: SaveCardInterface = {
      payment_id: cardData.id,
      brand: cardData.card.brand,
      exp_month: cardData.card.exp_month,
      exp_year: cardData.card.exp_year,
      last4: cardData.card.last4,
      user,
    };
    return from(this.sourceRepository.save(csData));
  }

  /**
   *
   * @param userId
   */
  listOfSources(user: UserInterface): Observable<any> {
    return from(
      this.sourceRepository.find({ where: { user } }),
    );
  }

  deleteSource(paymentId: PaymentIdInterfaceDelete): Observable<any> {
    return from(
      this.sourceRepository.findOne({
        where: {
          payment_id: paymentId.payment_id,
        },
      }),
    ).pipe(
      switchMap((paymentSource: DeleteCardInterface) => {
        return from(this.sourceRepository.delete(paymentSource.id));
      }),
    );
  }
}
