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
exports.SourceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
const stripeSources_entity_1 = require("../../../entities/user/stripeCustomer/stripeSources.entity");
const operators_1 = require("rxjs/operators");
let SourceService = class SourceService {
    constructor(sourceRepository) {
        this.sourceRepository = sourceRepository;
    }
    saveSource(cardData, user) {
        cardData.user = user;
        const csData = {
            payment_id: cardData.id,
            brand: cardData.card.brand,
            exp_month: cardData.card.exp_month,
            exp_year: cardData.card.exp_year,
            last4: cardData.card.last4,
            user,
        };
        return rxjs_1.from(this.sourceRepository.save(csData));
    }
    listOfSources(user) {
        return rxjs_1.from(this.sourceRepository.find({ where: { user } }));
    }
    deleteSource(paymentId) {
        return rxjs_1.from(this.sourceRepository.findOne({
            where: {
                payment_id: paymentId.payment_id,
            },
        })).pipe(operators_1.switchMap((paymentSource) => {
            return rxjs_1.from(this.sourceRepository.delete(paymentSource.id));
        }));
    }
};
SourceService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(stripeSources_entity_1.StripeSources)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SourceService);
exports.SourceService = SourceService;
//# sourceMappingURL=source.service.js.map