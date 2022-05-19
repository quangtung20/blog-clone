import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blog.entity";
import { Category } from "./category.entity";

@Entity()
export class SubCategory {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    title:string;

    @OneToMany(() => Blog, blog => blog.subCategory, { onDelete: 'CASCADE' })
    blogs: Blog[];

    @ManyToOne(type => Category, category => category.subCategories)
    category: Category;
}