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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const address_entity_1 = require("../../entities/user/address/address.entity");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let AddressService = class AddressService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    saveAddress(address, user) {
        address.user = user;
        return rxjs_1.from(this.addressRepository.save(address));
    }
    getAddresses(user) {
        return rxjs_1.from(this.addressRepository.find({
            where: {
                user: user.id,
            }, relations: ['user'],
        }));
    }
    findOne(id) {
        return rxjs_1.from(this.addressRepository.findOne({ id }, { relations: ['user'] })).pipe(operators_1.map(user => {
            if (user === undefined) {
                throw new common_1.HttpException(`User with #id ${id} not found`, common_1.HttpStatus.NOT_FOUND);
            }
            return user;
        }), operators_1.catchError(err => {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }));
    }
    updateAddress(id, address) {
        return rxjs_1.from(this.addressRepository.update(id, address)).pipe(operators_1.switchMap(() => this.findOne(id)));
    }
};
AddressService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(address_entity_1.Address)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map