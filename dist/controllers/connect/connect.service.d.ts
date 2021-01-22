import { FacebookAuthService } from 'facebook-auth-nestjs';
export declare class ConnectService {
    private readonly service;
    constructor(service: FacebookAuthService);
    getFacebookUser(accessToken: string): Promise<{
        id: string;
        name: string;
    }>;
}
