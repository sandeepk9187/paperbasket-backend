import { IsBoolean, IsDate, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'name is required' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'name is required & should be unique' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'password is required' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'dateOfBirth is required' })
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty({ description: 'mobile number is required' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: 'mobile verified is required' })
  @IsBoolean()
  phoneVerified: boolean;
}
