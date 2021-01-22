import { ConnectService } from './connect.service';
import { ConnectDto } from '../../dtos/user/connect.dto';
export declare class ConnectController {
    private connectService;
    constructor(connectService: ConnectService);
    facebookConnect(accessToken: ConnectDto, token: string): any;
}
