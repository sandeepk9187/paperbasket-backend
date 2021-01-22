import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerificationDto {
  @ApiProperty({ description: 'mobile number is required' })
  @IsString()
  mobileNumber: string;

  @ApiProperty({ description: 'code is required' })
  @IsString()
  code: string
}
