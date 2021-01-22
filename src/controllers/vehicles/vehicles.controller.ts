import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { Observable } from 'rxjs';
import { VehicleDto } from '../../dtos/user/vehicle.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Vehicles')
@Controller('api/v1')
export class VehiclesController {
  constructor(private vehicleService: VehiclesService) {}

  // @UseGuards(JwtAuthGuard)
  // @Post('/vehicle')
  // // eslint-disable-next-line @typescript-eslint/ban-types
  // postVehicle(@Body() vehicle: VehicleDto, @Req() req): Observable<Object> {
  //   return this.vehicleService.saveVehicle(vehicle, req.user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('/vehicles')
  // getAddresses(@Req() req): Observable<any> {
  //   return this.vehicleService.getVehicles(req.user);
  // }
}
