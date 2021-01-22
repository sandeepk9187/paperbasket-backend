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
exports.UserIsOwnerGuard = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const user_service_1 = require("../../user/user.service");
const address_service_1 = require("../address.service");
let UserIsOwnerGuard = class UserIsOwnerGuard {
    constructor(userService, addressService) {
        this.userService = userService;
        this.addressService = addressService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const params = request.params;
        const addressId = Number(params.id);
        const user = request.user;
        return this.userService.findOne(user.id).pipe(operators_1.switchMap((user) => this.addressService.findOne(addressId).pipe(operators_1.map((address) => {
            let hasPermission = false;
            if (user.id === address.user.id) {
                hasPermission = true;
            }
            if (user && hasPermission) {
                return true;
            }
            else {
                throw new common_1.HttpException(`You are not authorize to update this address`, common_1.HttpStatus.UNAUTHORIZED);
            }
        }))));
    }
};
UserIsOwnerGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService, address_service_1.AddressService])
], UserIsOwnerGuard);
exports.UserIsOwnerGuard = UserIsOwnerGuard;
//# sourceMappingURL=user-is-owner.guard.js.map