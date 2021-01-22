"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileImageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const profile_image_entity_1 = require("../../entities/user/profileImage/profile.image.entity");
let ProfileImageService = class ProfileImageService {
    constructor(profileImage) {
        this.profileImage = profileImage;
    }
    updateProfileImage(id, user) {
        return rxjs_1.from(this.profileImage.save(user)).pipe(operators_1.map(profilePic => profilePic), operators_1.catchError(err => {
            console.log(err.message);
            throw new common_1.HttpException('Something went wrong while saving image', common_1.HttpStatus.BAD_REQUEST);
        }));
    }
};
ProfileImageService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(profile_image_entity_1.ProfileImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProfileImageService);
exports.ProfileImageService = ProfileImageService;
//# sourceMappingURL=profile-image.service.js.map