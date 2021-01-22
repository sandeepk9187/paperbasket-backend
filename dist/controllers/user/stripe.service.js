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
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const nestjs_stripe_1 = require("nestjs-stripe");
const stripe_1 = require("stripe");
const createPaymentMethod_interface_1 = require("../../interfaces/user/createPaymentMethod.interface");
const operators_1 = require("rxjs/operators");
const source_service_1 = require("./services/source.service");
let StripeService = class StripeService {
    constructor(stripeClient, sourceService) {
        this.stripeClient = stripeClient;
        this.sourceService = sourceService;
    }
    createCustomer(customer) {
        const { email, userId } = customer;
        return rxjs_1.from(this.stripeClient.customers.create({
            email,
            metadata: {
                userId: userId
            }
        }));
    }
    createPaymentMethod(cardData) {
        const { number, exp_month, exp_year, cvc } = cardData;
        return rxjs_1.from(this.stripeClient.paymentMethods.create({
            type: 'card',
            card: {
                number,
                exp_month,
                exp_year,
                cvc
            }
        }));
    }
    attachPaymentMethod(stripeData, customer) {
        stripeData.customer_id = customer.customer;
        return rxjs_1.from(this.stripeClient.paymentMethods.attach(stripeData.payment_id, {
            customer: stripeData.customer_id
        }));
    }
    detachCard(paymentId) {
        return rxjs_1.from(this.stripeClient.paymentMethods.detach(paymentId.payment_id)).pipe(operators_1.switchMap(card => {
            return this.sourceService.deleteSource(paymentId);
        }), operators_1.catchError(err => {
            throw new common_1.BadRequestException(err.message);
        }));
    }
    listOfPaymentMethods(customer) {
        return rxjs_1.from(this.stripeClient.paymentMethods.list({
            customer: customer.customer,
            type: "card"
        }));
    }
    createPaymentIntentAndCharge() {
        return rxjs_1.from(this.stripeClient.paymentIntents.create({
            amount: 100,
            customer: "",
            payment_method: "",
            currency: 'usd',
            off_session: true,
            confirm: true
        }));
    }
};
StripeService = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_stripe_1.InjectStripe()),
    __metadata("design:paramtypes", [stripe_1.Stripe, source_service_1.SourceService])
], StripeService);
exports.StripeService = StripeService;
//# sourceMappingURL=stripe.service.js.map