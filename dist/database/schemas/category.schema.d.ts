import mongoose from "mongoose";
export declare type CategoryDocument = Category & Document;
export declare class Category {
    name: string;
}
export declare const CategorySchema: mongoose.Schema<mongoose.Document<Category, any, any>, mongoose.Model<mongoose.Document<Category, any, any>, any, any, any>, {}, {}>;
