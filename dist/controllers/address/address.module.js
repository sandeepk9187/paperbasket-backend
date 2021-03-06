"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModule = void 0;
const common_1 = require("@nestjs/common");
const address_controller_1 = require("./address.controller");
const address_service_1 = require("./address.service");
const typeorm_1 = require("@nestjs/typeorm");
const address_entity_1 = require("../../entities/user/address/address.entity");
const user_is_owner_guard_1 = require("./guards/user-is-owner.guard");
const user_module_1 = require("../user/user.module");
let AddressModule = class AddressModule {
};
AddressModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([address_entity_1.Address]), user_module_1.UserModule],
        controllers: [address_controller_1.AddressController],
        providers: [address_service_1.AddressService, user_is_owner_guard_1.UserIsOwnerGuard],
        exports: [address_service_1.AddressService],
    })
], AddressModule);
exports.AddressModule = AddressModule;
//# sourceMappingURL=address.module.js.map