import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SubCategory {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    title:string;
}