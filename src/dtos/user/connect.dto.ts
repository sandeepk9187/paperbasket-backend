import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConnectDto {
  @ApiProperty({ description: 'Token is required' })
  @IsString()
  street: string;
}
