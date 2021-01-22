import {
  ConflictException,
  Injectable,
  BadRequestException,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../../dtos/user/user.dto';
import { from, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { switchMap, catchError, map } from 'rxjs/operators';
import { LoginDto } from '../../dtos/user/login.dto';
import { UserInterface } from '../../interfaces/user/user.interface';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { MessageInterface } from '../../interfaces/user/message.interface';
import { VerificationInterface } from '../../interfaces/user/verification.interface';
import { StripeService } from './stripe.service';
import { StripeCustomer } from '../../entities/user/stripeCustomer/stripeCustomer.entity';
import { SaveCustomerStripeInterface } from '../../interfaces/user/SaveCustomerStripe.interface';
import { CreatedCustomerResponseInterface } from '../../interfaces/user/payment/createdCustomerResponse.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(StripeCustomer)
    private stripeRepository: Repository<StripeCustomer>,
    private authService: AuthService,
    @InjectTwilio() private readonly twilioClient: TwilioClient,
    private stripeService: StripeService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  sendSMS(data: MessageInterface): Observable<Object> {
    const { mobileNumber, channel } = data;
    return from(
      this.twilioClient.verify
        .services(process.env.TWILIO_VERIFICATION_SID)
        .verifications.create({ to: mobileNumber, channel: channel }),
    ).pipe(
      map(verification => {
        return verification;
      }),
      catchError(err => {
        throw new BadRequestException(err.message);
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  verifyMobileNumber(data: VerificationInterface): Observable<Object> {
    const { mobileNumber, code } = data;
    return from(
      this.twilioClient.verify
        .services(process.env.TWILIO_VERIFICATION_SID)
        .verificationChecks.create({
          to: mobileNumber,
          code: code,
        }),
    ).pipe(
      map(verification_check => {
        return verification_check;
      }),
      catchError(err => {
        throw new BadRequestException(err.message);
      }),
    );
  }

  /**
   *
   * @param user
   */
  create(user: UserDto): Observable<string> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((passwordHash: string) => {
        user.password = passwordHash;
        return from(this.userRepository.save(user)).pipe(
          switchMap(user => {
            return this.stripeService
              .createCustomer({
                email: user.email,
                userId: user.id,
              })
              .pipe(
                switchMap(
                  (createdCustomer: CreatedCustomerResponseInterface) => {
                    const csData: SaveCustomerStripeInterface = {
                      customer: createdCustomer.id,
                      user,
                    };
                    return from(this.stripeRepository.save(csData)).pipe(
                      switchMap(() => {
                        return this.authService.generateJwtToken(user).pipe(
                          map((jwt: string) => {
                            return jwt;
                          }),
                        );
                      }),
                    );
                  },
                ),
              );
          }),
        );
      }),
      catchError(e => {
        if (e.code && e.code === '23505') {
          throw new ConflictException(e.message);
        } else {
          throw new BadRequestException(e.message);
        }
      }),
    );
  }

  /**
   *
   * @param user
   */
  login(user: LoginDto): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: UserInterface) => {
        return this.authService
          .generateJwtToken(user)
          .pipe(map((jwt: string) => jwt));
      }),
      catchError(e => {
        throw new HttpException(
          'Entered email or password is not valid',
          HttpStatus.UNAUTHORIZED,
        );
      }),
    );
  }

  /**
   *
   * @param email
   * @param password
   */
  validateUser(email: string, password: string): Observable<UserInterface> {
    return this.findByEmail(email).pipe(
      switchMap((user: any) => {
        return this.authService.comparePassword(password, user.password).pipe(
          map((match: boolean) => {
            if (match === true) {
              return user;
            } else {
              throw new UnauthorizedException();
            }
          }),
        );
      }),
    );
  }

  findByEmail(email: string): Observable<any> {
    return from(this.userRepository.findOne({ email }));
  }

  findOne(id: number): Observable<UserInterface> {
    return from(
      this.userRepository.findOne(
        id,
        {
          relations: ['stripe', 'address', 'vehicle', 'cards'],
        },
      ),
    ).pipe(
      map((user: UserInterface) => {
        const { password, ...result } = user;
        return result;
      }),
    );
  }
}
