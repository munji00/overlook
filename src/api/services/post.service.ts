import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreatePostDto, FetchPostDto, UpdatePostDto} from '../dto/post.dto';
import Post  from '../../database/models/post/post.entity';

@Injectable()
export class PostService {

    constructor(@InjectRepository(Post) private postRepository: Repository<Post>) { }

   async createPost(post:CreatePostDto): Promise<FetchPostDto> {
        const newPost = await this.postRepository.create(post);
        return await this.postRepository.save(newPost);
    }


    async getPosts(): Promise<FetchPostDto[]> {
        return await this.postRepository.find({
            relations:{
                postComments:true, 
                likes:true, 
                shares:true,
                user:true
            },
            select:{
                likes:{
                    id:true, 
                    reaction:true
                },
                user:{
                    id:true,
                    userName:true,
                    bio:true,
                }
            }
        });
    }


    async getPost(id: number): Promise<FetchPostDto> {
        return await this.postRepository.findOne({
            where: { id }, 
            relations:{
                postComments:true, 
                likes:true, 
                shares:true}, 
                select:{
                    likes:{
                        id:true, 
                        reaction:true
                    }
                }
            });
        }


    async updatePost(id: number, postData: UpdatePostDto): Promise<FetchPostDto | undefined> {
        const post = await this.postRepository.findOne({where: { id }});
        if (!post) 
          return undefined;

        this.postRepository.merge(post, postData);
        return this.postRepository.save(post);
    }
    

     async deletePost(id: number): Promise<boolean> {
        const result = await this.postRepository.delete(id);
        return result.affected > 0
    }
}