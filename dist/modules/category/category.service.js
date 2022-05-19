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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../../database/entities/category.entity");
const typeorm_2 = require("typeorm");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async createCategory(data) {
        const { title } = data;
        const check = await this.categoryRepository.findOne({ title }).catch((error) => {
            throw new common_1.InternalServerErrorException(error.message);
        });
        if (check) {
            throw new common_1.BadRequestException({ msg: 'This category is already exists' });
        }
        try {
            await this.categoryRepository.save({ title });
            return { msg: 'done' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
    async getCategories() {
        try {
            const categories = await this.categoryRepository.find();
            return { categories };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
    async updateCategory(id, title) {
        const check = await this.categoryRepository.findOne(id);
        if (!check) {
            throw new common_1.BadRequestException('Category does not exist.');
        }
        try {
            await this.categoryRepository.update({
                id: id
            }, {
                title: title.toLowerCase()
            });
            return { msg: 'Update Success!' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
    async deleteCategory(id) {
        try {
            await this.categoryRepository.delete(id);
            return { msg: 'success' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map