import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VehicleDto {

  @ApiProperty({ description: 'modal is required' })
  @IsString()
  make: string;

  @ApiProperty({ description: 'type is required' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'year is required' })
  @IsNumber()
  year: number;

  @ApiProperty({ description: 'transmission is required' })
  @IsString()
  transmission: string;

  @ApiProperty({ description: 'licensePlate is required' })
  @IsString()
  licensePlate: string;

  @ApiProperty({ description: 'licensePlate is required' })
  @IsString()
  state: string;
}
