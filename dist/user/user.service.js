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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user/user.entity");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
const auth_service_1 = require("../auth/auth.service");
const operators_1 = require("rxjs/operators");
let UserService = class UserService {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    create(user) {
        return this.authService.hashPassword(user.password).pipe(operators_1.switchMap((passwordHash) => {
            user.password = passwordHash;
            return rxjs_1.from(this.userRepository.save(user));
        }), operators_1.catchError(e => {
            if (e.code && e.code === '23505') {
                throw new common_1.ConflictException(e.message);
            }
            else {
                throw new common_1.BadRequestException();
            }
        }));
    }
    login(user) {
        return this.validateUser(user.email, user.password).pipe(operators_1.switchMap((user) => {
            return this.authService
                .generateJwtToken(user)
                .pipe(operators_1.map((jwt) => jwt));
        }), operators_1.catchError(e => {
            throw new common_1.HttpException('Entered email or password is not valid', common_1.HttpStatus.UNAUTHORIZED);
        }));
    }
    validateUser(email, password) {
        return this.findByEmail(email).pipe(operators_1.switchMap((user) => {
            return this.authService.comparePassword(password, user.password).pipe(operators_1.map((match) => {
                if (match === true) {
                    return user;
                }
                else {
                    throw new common_1.UnauthorizedException();
                }
            }));
        }));
    }
    findByEmail(email) {
        return rxjs_1.from(this.userRepository.findOne({ email }));
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map