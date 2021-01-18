import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../../dtos/user/login.dto';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('auth/login')
  signIn(@Body() credentials: LoginDto): Observable<Object> {
    return this.userService.login(credentials);
  }
}
