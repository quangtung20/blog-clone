import { SubCategory } from "./sub-category.entity";
import { User } from "./user.entity";
export declare class Blog {
    id: string;
    title: string;
    description: string;
    content: string;
    view: number;
    thumbnail: string;
    user: User;
    subCategory: SubCategory;
}
