import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({unique:true})
    name:string;

    @Column({unique:true})
    account:string;

    @Column()
    password:string;

    @Column()
    role:string;

    @Column()
    type:string;

    @Column()
    avatar:string;


}