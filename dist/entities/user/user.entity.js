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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const address_entity_1 = require("./address/address.entity");
const vehicle_entity_1 = require("./vehicles/vehicle.entity");
const profile_image_entity_1 = require("./profileImage/profile.image.entity");
const stripeCustomer_entity_1 = require("./stripeCustomer/stripeCustomer.entity");
const stripeSources_entity_1 = require("./stripeCustomer/stripeSources.entity");
let User = class User {
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "emailToLowerCase", null);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "phoneVerified", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.OneToOne(type => profile_image_entity_1.ProfileImage, profileImage => profileImage.user, {
        cascade: true
    }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", profile_image_entity_1.ProfileImage)
], User.prototype, "profilePic", void 0);
__decorate([
    typeorm_1.OneToMany(type => address_entity_1.Address, address => address.user, {
        cascade: true
    }),
    __metadata("design:type", Array)
], User.prototype, "address", void 0);
__decorate([
    typeorm_1.OneToMany(type => vehicle_entity_1.Vehicle, vehicle => vehicle.user, {
        cascade: true
    }),
    __metadata("design:type", Array)
], User.prototype, "vehicle", void 0);
__decorate([
    typeorm_1.OneToOne(type => stripeCustomer_entity_1.StripeCustomer, stripe => stripe.user, {
        cascade: true
    }),
    __metadata("design:type", stripeCustomer_entity_1.StripeCustomer)
], User.prototype, "stripe", void 0);
__decorate([
    typeorm_1.OneToMany(type => stripeSources_entity_1.StripeSources, source => source.user),
    __metadata("design:type", Array)
], User.prototype, "cards", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map