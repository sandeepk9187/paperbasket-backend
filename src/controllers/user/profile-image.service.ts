import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProfileImage } from '../../entities/user/profileImage/profile.image.entity';
import { UserInterface } from '../../interfaces/user/user.interface';
import { ProfileImageInterface } from '../../interfaces/user/profile-image.interface';

@Injectable()
export class ProfileImageService {

  constructor(@InjectRepository(ProfileImage) private readonly profileImage: Repository<ProfileImage>) {
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  updateProfileImage(user: UserInterface, file: ProfileImageInterface): Observable<any> {
    file.user = user
    return from(this.profileImage.save(file)).pipe(
      map(profilePic => profilePic),
      catchError(err => {
        console.log(err.message)
        throw new HttpException(
          'Something went wrong while saving image',
          HttpStatus.BAD_REQUEST,
        )
      })
    )
  }
}
