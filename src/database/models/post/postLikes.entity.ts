import { Entity, PrimaryGeneratedColumn,Column , OneToMany ,ManyToOne, ManyToMany, JoinTable } from "typeorm";
import User from '../user/user.entity';
import Post from "./post.entity";


@Entity()
export default class PostLikes{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    postId:number;

    @Column()
    userId:number;

    @Column()
    reaction:string;

    @ManyToOne(() => User, (user) => user.likes)
    user: User

    @ManyToOne(() => Post, (user) => user.likes)
    post: Post
}