import { UserDto } from '../dtos/user/user.dto';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { LoginDto } from '../dtos/user/login.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    signup(user: UserDto): Observable<Object>;
    signIn(credentials: LoginDto): Observable<Object>;
}
