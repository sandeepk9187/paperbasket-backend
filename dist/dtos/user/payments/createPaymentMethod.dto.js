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
exports.CreatePaymentMethodDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreatePaymentMethodDto {
}
__decorate([
    swagger_1.ApiProperty({ description: 'card number is required' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreatePaymentMethodDto.prototype, "number", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'exp_month is required' }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreatePaymentMethodDto.prototype, "exp_month", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'exp_year is required' }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreatePaymentMethodDto.prototype, "exp_year", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'cvc is required' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreatePaymentMethodDto.prototype, "cvc", void 0);
exports.CreatePaymentMethodDto = CreatePaymentMethodDto;
//# sourceMappingURL=createPaymentMethod.dto.js.map