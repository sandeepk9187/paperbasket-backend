import { ProfileImageService } from './profile-image.service';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/interfaces/user/user.interface';
export declare class ProfileImageController {
    private profileImageService;
    constructor(profileImageService: ProfileImageService);
    uploadFile(file: any, req: any): Observable<UserInterface>;
}
