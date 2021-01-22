import { Address } from '../entities/user/address/address.entity';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { AddressInterface } from '../interfaces/user/address.interface';
import { UserInterface } from '../interfaces/user/user.interface';
export declare class AddressService {
    private addressRepository;
    constructor(addressRepository: Repository<Address>);
    saveAddress(address: AddressInterface, user: UserInterface): Observable<Object>;
    getAddresses(user: UserInterface): Observable<Object[]>;
}
