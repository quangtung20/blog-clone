import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { SubCategory } from "./sub-category.entity";
import { User } from "./user.entity";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({unique:true})
    title:string;

    @Column()
    description:string;

    @Column()
    content:string;

    @Column()
    view:number;

    @Column()
    thumbnail:string;

    @ManyToOne(() => User, user => user.blogs)
    user: User;

    @ManyToOne(() => SubCategory, subCategory => subCategory.blogs)
    subCategory: SubCategory;

}