import { CanActivate, Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { UserService } from '../../user/user.service';
import { AddressService } from '../address.service';
import { UserInterface } from '../../../interfaces/user/user.interface';
import { AddressInterface } from '../../../interfaces/user/address.interface';


@Injectable()
export class  UserIsOwnerGuard implements CanActivate {

  constructor(private userService: UserService, private addressService: AddressService) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const addressId = Number(params.id);
    const user: UserInterface = request.user;

    return this.userService.findOne(user.id).pipe(
      switchMap((user: UserInterface) => this.addressService.findOne(addressId).pipe(
        map((address: AddressInterface) => {
          let hasPermission = false;

          if(user.id === address.user.id) {
            hasPermission = true;
          }

          if(user && hasPermission) {
            return true
          } else {
            throw new HttpException(
              `You are not authorize to update this address`,
              HttpStatus.UNAUTHORIZED,
            )
          }
        })
      ))
    )
  }
}