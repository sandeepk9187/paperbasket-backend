import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LoginDto } from '../../dtos/user/login.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';

@ApiBearerAuth()
@ApiTags('Authentication and user actions')
@Controller('api/v1')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('auth/login')
  // eslint-disable-next-line @typescript-eslint/ban-types
  signIn(@Body() credentials: LoginDto): Observable<Object> {
    return this.userService.login(credentials).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/me')
  // eslint-disable-next-line @typescript-eslint/ban-types
  me(@Req() req): Observable<Object> {
    return this.userService.findOne(req.user.id).pipe(
      map(user => {
        return user;
      }),
    );
  }
}
