import { JwtService } from '@nestjs/jwt';
import { UserInterface } from '../../interfaces/user/user.interface';
import { Observable } from 'rxjs';
import { StripeService } from '../user/stripe.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly stripeService;
    constructor(jwtService: JwtService, stripeService: StripeService);
    generateJwtToken(user: UserInterface): Observable<string>;
    hashPassword(password: string): Observable<string>;
    comparePassword(client_password: string, db_password: string): Observable<any | boolean>;
}
