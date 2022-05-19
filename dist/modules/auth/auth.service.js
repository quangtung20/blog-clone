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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const google_auth_library_1 = require("google-auth-library");
const share_service_1 = require("../share/share.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../database/entities/user.entity");
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    constructor(jwtService, configService, shareService, userRepository) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.shareService = shareService;
        this.userRepository = userRepository;
        this.client = new google_auth_library_1.OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
        this.clientUrl = this.configService.get('CLIENT_URL');
    }
    async register(newUserDto) {
        try {
            const { name, account, password } = newUserDto;
            const user = await this.userRepository.findOne({ account });
            if (user) {
                throw new common_1.BadRequestException({ msg: 'Email is already exist' });
            }
            const passwordHash = await bcrypt.hash(password, 12);
            const newUser = {
                name, account, password: passwordHash
            };
            const active_token = await this.jwtService.sign({ newUser }, { expiresIn: '1d' });
            const url = `${this.clientUrl}/active/${active_token}`;
            await this.userRepository.save(newUser);
            return {
                msg: 'Success! Please check your email.',
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async login(account, password, res) {
        try {
            const user = await this.userRepository.findOne({ account });
            if (!user) {
                throw new common_1.BadRequestException({ msg: 'This account does not exits.' });
            }
            return this.loginUser(user, password, res);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async loginUser(user, password, res) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.BadRequestException({ msg: "Password is incorrect." });
        }
        const access_token = await this.jwtService.sign({ id: user.id });
        const refresh_token = await this.jwtService.sign({ id: user.id });
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: `/api/refresh_token`,
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        return {
            msg: 'Login Success!',
            access_token,
            user: Object.assign(Object.assign({}, user), { password: '' })
        };
    }
    async logout(res) {
        res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
        return { msg: 'Logged out!' };
    }
    async refreshToken(req) {
        try {
            const rfToken = req.cookies.refreshtoken;
            if (!rfToken)
                throw new common_1.BadRequestException({ msg: "Please login now!" });
            const decoded = this.jwtService.verify(rfToken);
            if (!decoded.id) {
                throw new common_1.BadRequestException({ msg: "Please login now!" });
            }
            const user = await this.userRepository.findOne({ id: decoded.id });
            if (!user)
                throw new common_1.BadRequestException({ msg: "This account does not exist." });
            const access_token = this.jwtService.sign({ id: user.id });
            return { access_token, user };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        share_service_1.ShareService,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map