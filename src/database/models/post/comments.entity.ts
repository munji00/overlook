import { Entity, PrimaryGeneratedColumn,Column ,ManyToOne} from "typeorm";
import Post from "./post.entity";


@Entity()
export default class PostComments{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    comment:string;

    @Column()
    createdAt:Date;


    @Column()
    postId:number;

    @ManyToOne(() => Post, (post) => post.postComments)
    post: Post
}