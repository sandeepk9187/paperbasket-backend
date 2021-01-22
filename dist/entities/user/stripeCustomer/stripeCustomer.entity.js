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
exports.StripeCustomer = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user.entity");
let StripeCustomer = class StripeCustomer {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], StripeCustomer.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], StripeCustomer.prototype, "customer", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], StripeCustomer.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], StripeCustomer.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", Date)
], StripeCustomer.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_entity_1.User, user => user.stripe),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.User)
], StripeCustomer.prototype, "user", void 0);
StripeCustomer = __decorate([
    typeorm_1.Entity()
], StripeCustomer);
exports.StripeCustomer = StripeCustomer;
//# sourceMappingURL=stripeCustomer.entity.js.map