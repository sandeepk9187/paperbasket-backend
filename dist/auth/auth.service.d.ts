import { JwtService } from '@nestjs/jwt';
import { UserInterface } from '../interfaces/user/user.interface';
import { Observable } from 'rxjs';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateJwtToken(user: UserInterface): Observable<string>;
    hashPassword(password: string): Observable<string>;
    comparePassword(client_password: string, db_password: string): Observable<any | boolean>;
}
