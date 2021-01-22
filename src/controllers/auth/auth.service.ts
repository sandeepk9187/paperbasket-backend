import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from '../../interfaces/user/user.interface';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SaveCustomerStripeInterface } from '../../interfaces/user/SaveCustomerStripe.interface';
import { StripeService } from '../user/stripe.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly stripeService: StripeService) {}

  /**
   *
   * @param user
   */
  generateJwtToken(user: UserInterface): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }

  /**
   *
   * @param password
   */
  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  /**
   *
   * @param client_password
   * @param db_password
   */
  comparePassword(
    client_password: string,
    db_password: string
  ): Observable<any | boolean> {
    return from<any | boolean>(bcrypt.compare(client_password, db_password));
  }
}
