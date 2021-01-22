import { ProfileImage } from './entities/profile.image.entity';
import { Repository } from 'typeorm';
export declare class ProfileImageService {
    private readonly profileImage;
    constructor(profileImage: Repository<ProfileImage>);
}
