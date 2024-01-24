import { Entity, PrimaryGeneratedColumn,Column} from "typeorm";


@Entity()
export default class UserAssets{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({default:""})
    userProfile!:string;

    @Column({default:""})
    userBackground!:string;
}