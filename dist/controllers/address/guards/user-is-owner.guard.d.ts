import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from "rxjs";
import { UserService } from '../../user/user.service';
import { AddressService } from '../address.service';
export declare class UserIsOwnerGuard implements CanActivate {
    private userService;
    private addressService;
    constructor(userService: UserService, addressService: AddressService);
    canActivate(context: ExecutionContext): Observable<boolean>;
}
