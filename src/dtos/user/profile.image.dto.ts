import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '../../interfaces/user/user.interface';

export class ProfileImageDto {
  @ApiProperty({ description: "Image url is required" })
  readonly imageUrl: string

  @ApiProperty({ description: "u" })
  user: UserInterface
}
