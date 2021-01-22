import { Address } from '../../entities/user/address/address.entity';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { AddressInterface } from '../../interfaces/user/address.interface';
import { UserInterface } from '../../interfaces/user/user.interface';
import { AddressUpdateInterface } from '../../interfaces/user/address-update.interface';
export declare class AddressService {
    private addressRepository;
    constructor(addressRepository: Repository<Address>);
    saveAddress(address: AddressInterface, user: UserInterface): Observable<Object>;
    getAddresses(user: UserInterface): Observable<Object[]>;
    findOne(id: number): Observable<AddressInterface>;
    updateAddress(id: number, address: AddressUpdateInterface): Observable<Object>;
}
