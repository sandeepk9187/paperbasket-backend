import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { ProfileImage } from '../../entities/user/profileImage/profile.image.entity';
export declare class ProfileImageService {
    private readonly profileImage;
    constructor(profileImage: Repository<ProfileImage>);
    updateProfileImage(id: number, user: object): Observable<any>;
}
