import { User } from '../../entities/user/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../../dtos/user/user.dto';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../../dtos/user/login.dto';
import { UserInterface } from '../../interfaces/user/user.interface';
import { TwilioClient } from 'nestjs-twilio';
import { MessageInterface } from '../../interfaces/user/message.interface';
import { VerificationInterface } from '../../interfaces/user/verification.interface';
// import { StripeService } from './stripe.service';
// import { StripeCustomer } from '../../entities/user/stripeCustomer/stripeCustomer.entity';
export declare class UserService {
  private userRepository;
  private authService;
  private readonly twilioClient;
  constructor(
    userRepository: Repository<User>,
    authService: AuthService,
    twilioClient: TwilioClient,
  );
  sendSMS(data: MessageInterface): Observable<Object>;
  verifyMobileNumber(data: VerificationInterface): Observable<Object>;
  create(user: UserDto): Observable<string>;
  login(user: LoginDto): Observable<string>;
  validateUser(email: string, password: string): Observable<UserInterface>;
  findByEmail(email: string): Observable<any>;
  findOne(id: number): Observable<UserInterface>;
}
