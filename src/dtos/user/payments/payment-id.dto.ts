import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentIdDto {
  @ApiProperty({ description: 'payment id is required' })
  @IsString()
  payment_id: string;
}
