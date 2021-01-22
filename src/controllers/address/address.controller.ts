import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AddressDto } from '../../dtos/user/address.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { map } from 'rxjs/operators';
import { UserIsOwnerGuard } from './guards/user-is-owner.guard';

@ApiBearerAuth()
@ApiTags('Address')
@Controller('api/v1')
export class AddressController {
  constructor(private addressService: AddressService) {}

  // @UseGuards(JwtAuthGuard, UserIsOwnerGuard)
  // @Post('/address')
  // // eslint-disable-next-line @typescript-eslint/ban-types
  // postAddress(@Body() address: AddressDto, @Req() req): Observable<Object> {
  //   console.log('user: ', req.user)
  //   return this.addressService.saveAddress(address, req.user)
  // }

  // @UseGuards(JwtAuthGuard, UserIsOwnerGuard)
  // @Put('/updateAddress/:id')
  // updateAddress(@Body() address: AddressDto, @Param('id') id: number) {
  //   return this.addressService.updateAddress(id, address)
  // }

  // @UseGuards(JwtAuthGuard, UserIsOwnerGuard)
  // @Get('/addresses')
  // getAddresses(@Req() req) : Observable<any> {
  //   return this.addressService.getAddresses(req.user)
  // }

  // @UseGuards(JwtAuthGuard, UserIsOwnerGuard)
  // @Get('/findSingleAddress/:id')
  // // eslint-disable-next-line @typescript-eslint/ban-types
  // findSingleAddress(@Param('id') id: number): Observable<Object> {
  //   return this.addressService.findOne(id).pipe(
  //     map(user => user)
  //   )
  // }
}
