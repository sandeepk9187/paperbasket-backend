import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { AuthModule } from '../auth/auth.module';
import { ProfileImageService } from './profile-image.service';
import { ProfileImage } from '../../entities/user/profileImage/profile.image.entity';
import { StripeService } from './stripe.service';
import { StripeCustomer } from '../../entities/user/stripeCustomer/stripeCustomer.entity';
import { StripeSources } from '../../entities/user/stripeCustomer/stripeSources.entity';
import { SourceService } from './services/source.service';

@Module({
	imports: [TypeOrmModule.forFeature([User, ProfileImage, StripeCustomer, StripeSources]), AuthModule],
	controllers: [UserController],
	providers: [UserService, ProfileImageService, StripeService, SourceService],
	exports: [UserService, ProfileImageService, StripeService],
})
export class UserModule {
}
