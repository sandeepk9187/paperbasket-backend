'use strict';
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
var __rest =
  (this && this.__rest) ||
  function(s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserService = void 0;
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const user_entity_1 = require('../../entities/user/user.entity');
const typeorm_2 = require('typeorm');
const rxjs_1 = require('rxjs');
const auth_service_1 = require('../auth/auth.service');
const operators_1 = require('rxjs/operators');
const nestjs_twilio_1 = require('nestjs-twilio');
const stripe_service_1 = require('./stripe.service');
const stripeCustomer_entity_1 = require('../../entities/user/stripeCustomer/stripeCustomer.entity');
let UserService = class UserService {
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }
  sendSMS(data) {
    const { mobileNumber, channel } = data;
    return rxjs_1
      .from(
        this.twilioClient.verify
          .services(process.env.TWILIO_VERIFICATION_SID)
          .verifications.create({ to: mobileNumber, channel: channel }),
      )
      .pipe(
        operators_1.map(verification => {
          return verification;
        }),
        operators_1.catchError(err => {
          throw new common_1.BadRequestException(err.message);
        }),
      );
  }
  verifyMobileNumber(data) {
    const { mobileNumber, code } = data;
    return rxjs_1
      .from(
        this.twilioClient.verify
          .services(process.env.TWILIO_VERIFICATION_SID)
          .verificationChecks.create({
            to: mobileNumber,
            code: code,
          }),
      )
      .pipe(
        operators_1.map(verification_check => {
          return verification_check;
        }),
        operators_1.catchError(err => {
          throw new common_1.BadRequestException(err.message);
        }),
      );
  }
  create(user) {
    return this.authService.hashPassword(user.password).pipe(
      operators_1.switchMap(passwordHash => {
        user.password = passwordHash;
        return rxjs_1.from(this.userRepository.save(user)).pipe(
          operators_1.switchMap(user => {
            return this.stripeService
              .createCustomer({
                email: user.email,
                userId: user.id,
              })
              .pipe(
                operators_1.switchMap(createdCustomer => {
                  const csData = {
                    customer: createdCustomer.id,
                    user,
                  };
                  return rxjs_1.from(this.stripeRepository.save(csData)).pipe(
                    operators_1.switchMap(() => {
                      return this.authService.generateJwtToken(user).pipe(
                        operators_1.map(jwt => {
                          return jwt;
                        }),
                      );
                    }),
                  );
                }),
              );
          }),
        );
      }),
      operators_1.catchError(e => {
        if (e.code && e.code === '23505') {
          throw new common_1.ConflictException(e.message);
        } else {
          throw new common_1.BadRequestException(e.message);
        }
      }),
    );
  }
  login(user) {
    return this.validateUser(user.email, user.password).pipe(
      operators_1.switchMap(user => {
        return this.authService
          .generateJwtToken(user)
          .pipe(operators_1.map(jwt => jwt));
      }),
      operators_1.catchError(e => {
        throw new common_1.HttpException(
          'Entered email or password is not valid',
          common_1.HttpStatus.UNAUTHORIZED,
        );
      }),
    );
  }
  validateUser(email, password) {
    return this.findByEmail(email).pipe(
      operators_1.switchMap(user => {
        return this.authService.comparePassword(password, user.password).pipe(
          operators_1.map(match => {
            if (match === true) {
              return user;
            } else {
              throw new common_1.UnauthorizedException();
            }
          }),
        );
      }),
    );
  }
  findByEmail(email) {
    return rxjs_1.from(this.userRepository.findOne({ email }));
  }
  findOne(id) {
    return rxjs_1
      .from(
        this.userRepository.findOne(id, {
          relations: ['stripe', 'address', 'vehicle', 'cards'],
        }),
      )
      .pipe(
        operators_1.map(user => {
          const { password } = user,
            result = __rest(user, ['password']);
          return result;
        }),
      );
  }
};
UserService = __decorate(
  [
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(
      1,
      typeorm_1.InjectRepository(stripeCustomer_entity_1.StripeCustomer),
    ),
    __param(3, nestjs_twilio_1.InjectTwilio()),
    __metadata('design:paramtypes', [
      typeorm_2.Repository,
      typeorm_2.Repository,
      auth_service_1.AuthService,
      Object,
      stripe_service_1.StripeService,
    ]),
  ],
  UserService,
);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
