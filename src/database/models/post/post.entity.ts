import { Entity, PrimaryGeneratedColumn,Column , OneToMany ,ManyToOne, ManyToMany, JoinTable } from "typeorm";
import User from '../user/user.entity'
import PostComments from "./comments.entity";
import PostLikes from "./postLikes.entity";


@Entity()
export default class Post{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:""})
    tags:string;

    @Column({default:""})
    content:string;

    @Column({default:""})
    description:string;
    
    
    @Column()
    createdAt:Date;

    @Column()
    userId:number;


    @OneToMany(()=> PostLikes, (postLikes)=> postLikes.post)
    likes:PostLikes[];
    

    @ManyToMany(()=> User)
    @JoinTable()
    shares:User[];


    @OneToMany(() => PostComments, (postComments) => postComments.post)
    @JoinTable()
    postComments: PostComments[]

    @ManyToOne(() => User, (user) => user.posts)
    user: User
}