import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    mobile: string;

    @Column({select: false})
    password: string;

}