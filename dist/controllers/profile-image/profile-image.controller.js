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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileImageController = void 0;
const common_1 = require("@nestjs/common");
const profile_image_service_1 = require("./profile-image.service");
const jwt_guard_1 = require("../auth/guards/jwt-guard");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const rxjs_1 = require("rxjs");
const user_interface_1 = require("../../interfaces/user/user.interface");
const operators_1 = require("rxjs/operators");
const api_implicit_file_decorator_1 = require("@nestjs/swagger/dist/decorators/api-implicit-file.decorator");
let ProfileImageController = class ProfileImageController {
    constructor(profileImageService) {
        this.profileImageService = profileImageService;
    }
    uploadFile(file, req) {
        const user = req.user;
        console.log('user: ', req.user);
        return this.profileImageService.updateProfileImage(user.id, {
            profileImage: file.path,
        }).pipe(operators_1.map((user) => user), operators_1.catchError(() => {
            throw new common_1.BadRequestException();
        }));
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Post('/user/upload'),
    swagger_1.ApiConsumes('multipart/form-data'),
    api_implicit_file_decorator_1.ApiImplicitFile({ name: 'file', required: true }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        storage: multer_1.diskStorage({
            destination: './uploads/profile-images',
            filename: (req, file, cb) => {
                const filename = uuid_1.v4() + '-' + path_1.parse(file.originalname).name.replace(/\s/g, '');
                const extension = path_1.parse(file.originalname).ext;
                cb(null, `${filename}${extension}`);
            },
        }),
    })),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ProfileImageController.prototype, "uploadFile", null);
ProfileImageController = __decorate([
    common_1.Controller('profile-image'),
    __metadata("design:paramtypes", [typeof (_a = typeof profile_image_service_1.ProfileImageService !== "undefined" && profile_image_service_1.ProfileImageService) === "function" ? _a : Object])
], ProfileImageController);
exports.ProfileImageController = ProfileImageController;
//# sourceMappingURL=profile-image.controller.js.map