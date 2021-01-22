import { Address } from './address/address.entity';
import { Vehicle } from './vehicles/vehicle.entity';
import { ProfileImage } from './profileImage/profile.image.entity';
import { StripeCustomer } from './stripeCustomer/stripeCustomer.entity';
import { StripeSources } from './stripeCustomer/stripeSources.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    emailToLowerCase(): void;
    password: string;
    dateOfBirth: Date;
    phoneNumber: string;
    phoneVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    profilePic: ProfileImage;
    address: Address[];
    vehicle: Vehicle[];
    stripe: StripeCustomer;
    cards: StripeSources[];
}
