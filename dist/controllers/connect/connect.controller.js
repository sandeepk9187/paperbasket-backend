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
exports.ConnectController = void 0;
const common_1 = require("@nestjs/common");
const connect_service_1 = require("./connect.service");
const connect_dto_1 = require("../../dtos/user/connect.dto");
let ConnectController = class ConnectController {
    constructor(connectService) {
        this.connectService = connectService;
    }
    facebookConnect(accessToken, token) {
        return this.connectService.getFacebookUser(accessToken.toString());
    }
};
__decorate([
    common_1.Get('auth/connect'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [connect_dto_1.ConnectDto, String]),
    __metadata("design:returntype", Object)
], ConnectController.prototype, "facebookConnect", null);
ConnectController = __decorate([
    common_1.Controller('api/v1'),
    __metadata("design:paramtypes", [connect_service_1.ConnectService])
], ConnectController);
exports.ConnectController = ConnectController;
//# sourceMappingURL=connect.controller.js.map