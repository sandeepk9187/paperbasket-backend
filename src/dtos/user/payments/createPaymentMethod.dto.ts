import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentMethodDto {
  @ApiProperty({ description: 'card number is required' })
  @IsString()
  number: string;

  @ApiProperty({ description: 'exp_month is required' })
  @IsNumber()
  exp_month: number;

  @ApiProperty({ description: 'exp_year is required' })
  @IsNumber()
  exp_year: number;

  @ApiProperty({ description: 'cvc is required' })
  @IsString()
  cvc: string;
}
