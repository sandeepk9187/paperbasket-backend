import {
  Injectable,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { switchMap, catchError, map } from 'rxjs/operators';
import { LoginDto } from '../../dtos/user/login.dto';
import { UserInterface } from '../../interfaces/user/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  /**
   *
   * @param user
   */
  login(user: LoginDto): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      map((user: UserInterface) => {
        const { password, ...result } = user;
        return result;
      }),
      catchError((e) => {
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
    return from(this.userRepository.findOne(id)).pipe(
      map((user: UserInterface) => {
        const { password, ...result } = user;
        return result;
      }),
    );
  }
}
