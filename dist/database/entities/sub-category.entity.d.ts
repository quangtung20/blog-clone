import { Blog } from "./blog.entity";
import { Category } from "./category.entity";
export declare class SubCategory {
    id: string;
    title: string;
    blogs: Blog[];
    category: Category;
}
