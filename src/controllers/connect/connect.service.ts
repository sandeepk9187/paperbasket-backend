import { Injectable } from '@nestjs/common';
import { FacebookAuthService } from 'facebook-auth-nestjs';

@Injectable()
export class ConnectService {
  constructor(private readonly service: FacebookAuthService) {}

  async getFacebookUser(
    accessToken: string,
  ): Promise<{ id: string; name: string }> {
    return await this.service.getUser(accessToken, 'id', 'name');
  }
}
