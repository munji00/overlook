import { Controller, Get, Delete,Param, Res, Put, Body, Post, Req} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PostActionsService } from '../services/postActions.service';
import { Response } from 'express';
import PostLikes from 'src/database/models/post/postLikes.entity';

@Controller('post-activities')
export class PostActionsController {
    constructor(private service: PostActionsService) { }

    @Post('toggle-like/:id')
    async postLikesToggle(@Param() params, @Body() postLikesData:PostLikes ,@Res() res:Response){
        const postId = params.id;
        const {id, reaction} = postLikesData
        try {
            const result = await this.service.likePostToggle({postId:+postId, userId:id, reaction});
            res.status(200).send({success:true, result})
        } catch (error) {
            throw new HttpException(error.message , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


     @Post('comment/:id')
    async addComments(@Param() params , @Body() data ,@Res() res:Response) {
        const {id} = params;
        const {comment} = data;
        try {
            const commentsData = await this.service.commentsOnPost({postId:+id, comment, createdAt:new Date()});
            res.status(200).send({success:true, commentsData})
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    @Delete('comment/:id')
    async removeComments(@Param() params,@Res() res:Response){
        const commentsId = params.id;
        try {
            const isDone = await this.service.uncommentsOnPost(+commentsId);
            res.status(200).send({success:isDone})
        } catch (error) {
            throw new HttpException(error.message , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}