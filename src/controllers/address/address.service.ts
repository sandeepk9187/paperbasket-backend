import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../../entities/user/address/address.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { AddressInterface } from '../../interfaces/user/address.interface';
import { UserInterface } from '../../interfaces/user/user.interface';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AddressUpdateInterface } from '../../interfaces/user/address-update.interface';

@Injectable()
export class AddressService {
  constructor(@InjectRepository(Address) private addressRepository: Repository<Address>) {
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  saveAddress(address: AddressInterface, user: UserInterface): Observable<Object> {
    address.user = user;
    return from(this.addressRepository.save(address));
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  getAddresses(user: UserInterface): Observable<Object[]> {
    return from(this.addressRepository.find({
      where: {
        user: user.id,
      }, relations: ['user'],
    }));
  }

  findOne(id: number): Observable<AddressInterface> {
    return from(this.addressRepository.findOne({ id }, { relations: ['user'] })).pipe(
      map(user => {
        if(user === undefined) {
          throw new HttpException(
            `User with #id ${id} not found`,
            HttpStatus.NOT_FOUND,
          );
        }
        return user
      }),
      catchError(err => {
        throw new HttpException(
          'Not found',
          HttpStatus.NOT_FOUND,
        );
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  updateAddress(id: number, address: AddressUpdateInterface): Observable<Object> {
    return from(this.addressRepository.update(id, address)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }
}
