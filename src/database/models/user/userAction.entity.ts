import { Entity, PrimaryGeneratedColumn,Column, OneToMany, ManyToOne} from "typeorm";
import User from './user.entity'


@Entity()
export default class UserActions{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    friId!:number;

    @Column()
    fraId!:number;

    @ManyToOne(()=> User, (user)=> user.fri)
    fri!:User

    @ManyToOne(()=> User, (user)=> user.fra)
    fra!:User

    @Column()
    isAccepted!:boolean;

}