import { Controller, Get, Delete,Param, Res, Put, Body, Post} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { Response } from 'express';
import  PostEntity from 'src/database/models/post/post.entity';

@Controller('post')
export class PostController {
    constructor(private service: PostService) { }

    @Post('create')
    async createPost(@Body() postData:PostEntity,@Res() res:Response){
        const {id, tags,description , content} = postData
        try {
            const post = await this.service.createPost({tags, description ,content, userId:id, createdAt: new Date()});
            res.status(200).send({success:true, post})
        } catch (error) {
            throw new HttpException('internal server error' , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

     @Get('all')
    async getPosts(@Res() res:Response) {
        try {
            const posts = await this.service.getPosts();
            res.status(200).send({success:true, posts})
        } catch (error) {
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    
    @Get(':id')
    async getPost(@Param() params ,@Res() res:Response) {
        try {
            const post = await this.service.getPost(params.id);
            res.status(200).send({success:true, post})
        } catch (error) {
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    @Put('update/:id')
    async updatePost(@Param() params ,@Body() postData:PostEntity ,@Res() res:Response) {
        const {id} = params
        try {
            const post = await this.service.updatePost(+id, postData);
            res.status(200).send({success:true, post})
        } catch (error) {
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Delete('remove/:id')
    async deletePost(@Param() params,@Res() res:Response) {
        const {id} = params
        try {
            if(!await this.service.deletePost(+id))
              return res.status(200).send({success:false, message:"No post for this id"})
            res.status(200).send({success:true, message:"Post deleted successfully"})
        } catch (error) {
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}