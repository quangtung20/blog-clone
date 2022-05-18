import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
    thumbnail:string;
}