import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor() {}

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
    db_password: string,
  ): Observable<any | boolean> {
    return from<any | boolean>(bcrypt.compare(client_password, db_password));
  }
}
