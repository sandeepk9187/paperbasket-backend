import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MessageDto {
  @ApiProperty({ description: 'mobile number is required' })
  @IsString()
  mobileNumber: string;

  @ApiProperty({ description: 'channel is required' })
  @IsString()
  channel: string
}
