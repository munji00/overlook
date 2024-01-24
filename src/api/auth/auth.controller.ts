import { Controller, Post, Body, Res, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UsersService } from '../services/user.service';
import { Response } from 'express';
import { JwtService } from '../auth/jwt.service';
import { SignupDto } from './dto/auth.td';
import { LoginDto } from './dto/auth.td';
import User from '../../database/models/user/user.entity'
import { ExistenceCheckInterceptor } from '../../common/interceptors/isUserExist';

@Controller('auth')
export class authController {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}


   @Post('signup')
   @UseInterceptors(ExistenceCheckInterceptor)
    async signup(@Body() user:User, @Res() response:Response) {
        try{
            const userData = await this.userService.createUser(user);
            response.status(201).send({success:true, message:"signup successfully", data:userData})
        }catch(error){
          if(error instanceof HttpException) throw error;
          throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Post('signin')
    @UseInterceptors(ExistenceCheckInterceptor)
    async signin(@Body() user:LoginDto, @Res() response:Response) {
        try{
            const userData = await this.userService.getUserByEmail(user.email);

            const isValid = await bcrypt.compare(user.password, userData.password);

            if(!isValid)
             throw new HttpException('password or email incorrect' , HttpStatus.NON_AUTHORITATIVE_INFORMATION)
            
            const accessToken = this.jwtService.generateToken({username:userData.userName ,email:user.email, password:user.password}) 
            response.cookie("accessToken", accessToken)
            response.status(200).send({success:true, message:"signin successfully", data:userData})
            
        }catch(error){
            if(error instanceof HttpException) throw error
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}