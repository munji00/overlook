import { Entity, PrimaryGeneratedColumn,Column, OneToMany, BeforeInsert, JoinTable, OneToOne} from "typeorm";
import Post from '../post/post.entity';
import * as bcrypt from 'bcrypt'
import UserActions from "./userAction.entity";
import PostLikes from "../post/postLikes.entity";
import UserAssets from "./userAssets.entity";


@Entity()
export default class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name!:string;

    @Column({default:""})
    userName:string;

    @Column({default:""})
    firstName:string;

    @Column({default:""})
    lastName:string;

    @Column()
    email!:string;

    @Column()
    password!:string;

    @BeforeInsert()
    async hashedPassword(){
      this.password = await bcrypt.hash(this.password, 10);
    }

    @Column()
    mobileNumber!:number;

    @Column({default:""})
    bio:string;

    @Column({default:""})
    address:string;

    @Column({default:""})
    gender:string;

    @Column({default:""})
    occupation:string;

    @OneToOne(()=> UserAssets)
    @JoinTable()
    assets:UserAssets;

    @OneToMany(()=> PostLikes, (postLikes)=> postLikes.user)
    likes:PostLikes[];

    @OneToMany(() => UserActions, (friends) => friends.fri)
    fri: UserActions[]

    @OneToMany(() => UserActions, (friends) => friends.fra)
    fra: UserActions[]

    @OneToMany(() => Post, (post) => post.user,)
    posts: Post[]
}


