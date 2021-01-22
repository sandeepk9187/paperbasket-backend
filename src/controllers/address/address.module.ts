import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../../entities/user/address/address.entity';
import { UserIsOwnerGuard } from './guards/user-is-owner.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), UserModule],
  controllers: [AddressController],
  providers: [AddressService, UserIsOwnerGuard],
  exports: [AddressService],
})
export class AddressModule {
}
