import { Controller, Get,Param, Res, Put, Body} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { Response } from 'express';
import User from 'src/database/models/user/user.entity';

@Controller('user')
export class UsersController {
    constructor(private service: UsersService) { }

    @Get('get-all')
    async getUsers(@Param() params ,@Res() res:Response){
        try {
            const usersData = await this.service.getUsers();
            res.status(200).send({success:true, usersData})
        } catch (error) {
            throw new HttpException('internal server error' , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    
    @Get(':id')
    async getUser(@Param() params ,@Res() res:Response) {
        try {
            const user = await this.service.getUserById(params.id);
            res.status(200).send({success:true, user})
        } catch (error) {
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }




    @Put('update')
    async updateUser(@Param() params ,@Body() userData:User ,@Res() res:Response) {
        const {id} = userData
        try {
            const user = await this.service.updateUser(+id, userData);
            res.status(200).send({success:true, user})
        } catch (error) {
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}