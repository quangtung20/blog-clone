import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategories(): Promise<{
        categories: import("../../database/entities/category.entity").Category[];
    }>;
    createCategory(user: any, data: CreateCategoryDto): Promise<{
        msg: string;
    }>;
    updateCategory(id: string, title: string): Promise<{
        msg: string;
    }>;
    deleteCategory(id: string): Promise<{
        msg: string;
    }>;
}
