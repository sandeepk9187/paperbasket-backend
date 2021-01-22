import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { LoginDto } from '../../dtos/user/login.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    signIn(credentials: LoginDto): Observable<Object>;
    me(req: any): Observable<Object>;
}
