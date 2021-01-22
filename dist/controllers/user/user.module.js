"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user/user.entity");
const auth_module_1 = require("../auth/auth.module");
const profile_image_service_1 = require("./profile-image.service");
const profile_image_entity_1 = require("../../entities/user/profileImage/profile.image.entity");
const stripe_service_1 = require("./stripe.service");
const stripeCustomer_entity_1 = require("../../entities/user/stripeCustomer/stripeCustomer.entity");
const stripeSources_entity_1 = require("../../entities/user/stripeCustomer/stripeSources.entity");
const source_service_1 = require("./services/source.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, profile_image_entity_1.ProfileImage, stripeCustomer_entity_1.StripeCustomer, stripeSources_entity_1.StripeSources]), auth_module_1.AuthModule],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, profile_image_service_1.ProfileImageService, stripe_service_1.StripeService, source_service_1.SourceService],
        exports: [user_service_1.UserService, profile_image_service_1.ProfileImageService, stripe_service_1.StripeService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map