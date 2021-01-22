"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RidesModule = void 0;
const common_1 = require("@nestjs/common");
const rides_controller_1 = require("./rides.controller");
const rides_service_1 = require("./rides.service");
const typeorm_1 = require("@nestjs/typeorm");
const ride_entity_1 = require("../../entities/user/rides/ride.entity");
const user_module_1 = require("../user/user.module");
let RidesModule = class RidesModule {
};
RidesModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([ride_entity_1.Ride]), user_module_1.UserModule],
        controllers: [rides_controller_1.RidesController],
        providers: [rides_service_1.RidesService]
    })
], RidesModule);
exports.RidesModule = RidesModule;
//# sourceMappingURL=rides.module.js.map