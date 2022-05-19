import { Blog } from "./blog.entity";
export declare class User {
    id: string;
    name: string;
    account: string;
    password: string;
    role: string;
    type: string;
    avatar: string;
    blogs: Blog[];
    created_at: Date;
    updated_at: Date;
}
