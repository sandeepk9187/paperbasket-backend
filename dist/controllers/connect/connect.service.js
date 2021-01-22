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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectService = void 0;
const common_1 = require("@nestjs/common");
const facebook_auth_nestjs_1 = require("facebook-auth-nestjs");
let ConnectService = class ConnectService {
    constructor(service) {
        this.service = service;
    }
    async getFacebookUser(accessToken) {
        return await this.service.getUser(accessToken, 'id', 'name');
    }
};
ConnectService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [facebook_auth_nestjs_1.FacebookAuthService])
], ConnectService);
exports.ConnectService = ConnectService;
//# sourceMappingURL=connect.service.js.map