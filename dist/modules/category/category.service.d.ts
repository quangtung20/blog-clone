import { Category } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    createCategory(data: any): Promise<{
        msg: string;
    }>;
    getCategories(): Promise<{
        categories: Category[];
    }>;
    updateCategory(id: string, title: string): Promise<{
        msg: string;
    }>;
    deleteCategory(id: string): Promise<{
        msg: string;
    }>;
}
