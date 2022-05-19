import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SubCategory } from "./sub-category.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    title:string;

    @OneToMany(() => SubCategory, subCategory => subCategory.category)
    subCategories: SubCategory[];
}