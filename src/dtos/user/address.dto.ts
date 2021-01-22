import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({ description: 'name is required' })
  @IsString()
  street: string;

  @ApiProperty({ description: 'name is required & should be unique' })
  @IsString()
  address: string;
}
