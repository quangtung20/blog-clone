import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose from "mongoose";
import { Document } from 'mongoose';
import { Category } from "./category.schema";
import { User } from "./user.schema";

export type BlogDocument = Blog & Document

@Schema({ timestamps: true })
export class Blog {
    @Prop({
        type: mongoose.Types.ObjectId, ref: User.name
    })
    @Type(() => User)
    user: User;

    @Prop({
        type: String,
        require: true,
        trim: true,
        minLength: 10,
        maxLength: 50
    })
    title: string;

    @Prop({
        type: String,
        require: true,
        minLength: 2000
    })
    content: string;


    @Prop({
        type: String,
        require: true,
        trim: true,
        maxLength: 200
    })
    description: string;

    @Prop({
        type: String,
        require: true
    })
    thumbnail: string;

    @Prop({
        type: mongoose.Types.ObjectId, ref: Category.name
    })
    @Type(() => Category)
    category: Category;

}

export const BlogSchema = SchemaFactory.createForClass(Blog);