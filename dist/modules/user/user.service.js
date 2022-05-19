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
const bcrypt = require("bcrypt");
const user_entity_1 = require("../../database/entities/user.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUser(id) {
        return await this.userRepository.findOne(id);
    }
    async resetPassword(user, password) {
        if (!user) {
            throw new common_1.BadRequestException({ msg: "Invalid Authentication." });
        }
        if (user.type !== 'register') {
            throw new common_1.BadRequestException({
                msg: `Quick login account with ${user.type} can't use this function.`
            });
        }
        const passwordHash = await bcrypt.hash(password, 12);
        await this.userRepository.update({ id: user.id }, { password: passwordHash });
        return { msg: 'success' };
    }
    async updateUser(user, data) {
        if (!user) {
            throw new common_1.BadRequestException({ msg: "Invalid Authentication." });
        }
        try {
            await this.userRepository.update({ id: user.id }, data);
            return { msg: "Update Success!" };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map