import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dtos/user/user.dto';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../dtos/user/login.dto';
import { UserInterface } from '../interfaces/user/user.interface';
export declare class UserService {
    private userRepository;
    private authService;
    constructor(userRepository: Repository<User>, authService: AuthService);
    create(user: UserDto): Observable<UserDto>;
    login(user: LoginDto): Observable<string>;
    validateUser(email: string, password: string): Observable<UserInterface>;
    findByEmail(email: string): Observable<any>;
}
