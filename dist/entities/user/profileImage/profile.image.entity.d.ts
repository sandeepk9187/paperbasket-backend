import { User } from 'src/entities/user/user.entity';
export declare class ProfileImage {
    id: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: User;
}
