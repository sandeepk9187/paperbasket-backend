import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'email is required' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'password is required' })
  @IsString()
  password: string
}
