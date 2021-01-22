import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { ProfileImage } from '../../entities/user/profileImage/profile.image.entity';
import { UserInterface } from '../../interfaces/user/user.interface';
import { ProfileImageInterface } from '../../interfaces/user/profile-image.interface';
export declare class ProfileImageService {
    private readonly profileImage;
    constructor(profileImage: Repository<ProfileImage>);
    updateProfileImage(user: UserInterface, file: ProfileImageInterface): Observable<any>;
}
