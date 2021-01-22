import { Observable } from 'rxjs';
import { AddressDto } from '../dtos/user/address.dto';
import { AddressService } from './address.service';
export declare class AddressController {
    private addressService;
    constructor(addressService: AddressService);
    postAddress(address: AddressDto, req: any): Observable<Object>;
    getAddresses(req: any): Observable<any>;
}
