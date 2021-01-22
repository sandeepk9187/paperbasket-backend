import { Body, Controller, Param, Get } from '@nestjs/common';
import { ConnectService } from './connect.service';
import { ConnectDto } from '../../dtos/user/connect.dto';
import { Observable } from 'rxjs';

@Controller('api/v1')
export class ConnectController {
  constructor(private connectService: ConnectService) {}

  @Get('auth/connect')
  facebookConnect(
    @Body() accessToken: ConnectDto,
    @Param('token') token: string,
  ): any {
    return this.connectService.getFacebookUser(accessToken.toString());
  }
}
