"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileImageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const profile_image_controller_1 = require("./profile-image.controller");
const profile_image_service_1 = require("./profile-image.service");
const profile_image_entity_1 = require("./entities/profile.image.entity");
let ProfileImageModule = class ProfileImageModule {
};
ProfileImageModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([profile_image_entity_1.ProfileImage])],
        controllers: [profile_image_controller_1.ProfileImageController],
        providers: [profile_image_service_1.ProfileImageService],
        exports: [profile_image_service_1.ProfileImageService]
    })
], ProfileImageModule);
exports.ProfileImageModule = ProfileImageModule;
//# sourceMappingURL=profile-image.module.js.map