import { Controller, Get, Delete,Param, Res, Put, Body, Post, Req} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserActionsService } from '../services/userAction.service';
import { Response } from 'express';
import UserAction from 'src/database/models/user/userAction.entity';

@Controller('suggestions')
export class UserActionsController {
    constructor(private service: UserActionsService) { }

    @Post('send/:id')
    async sendFriendRequest(@Param() params, @Body() userActionData:UserAction ,@Res() res:Response){
        const fraId = params.id;
        const friId = userActionData.id;
        try {
            const userAction = await this.service.createUserAction({fraId:+fraId , friId:+friId, isAccepted:false});
            res.status(200).send({success:true, userAction})
        } catch (error) {
            throw new HttpException(error.message , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

     @Get('all')
    async getUserActions(@Body() body ,@Res() res:Response) {
        const {id} = body;
        try {
            const userActions = await this.service.getUserActions(id);
            res.status(200).send({success:true, userActions})
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    @Put('accept/:id')
    async acceptFriendRequest(@Param() params,@Res() res:Response){
        const userActionId = params.id;
        try {
            const userAction = await this.service.updateUserAction(+userActionId);
            res.status(200).send({success:true, userAction})
        } catch (error) {
            throw new HttpException(error.message , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Delete('remove/:id')
    async removeFriendRequest(@Param() params,@Res() res:Response){
        const userActionId = params.id
        try {
            if(!await this.service.deleteUserAction(+userActionId))
              return res.status(200).send({success:false, message:"No friend request for this id"})
            res.status(200).send({success:true, message:"friend request deleted successfully"})
        } catch (error) {
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}