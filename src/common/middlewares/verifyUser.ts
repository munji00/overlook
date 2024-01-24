import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../api/auth/jwt.service';
import { UsersService } from '../../api/services/user.service';

@Injectable()
export class verifyUser implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userServices: UsersService
    ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.get('authorization')?.split(" ")[1];
    if (!accessToken) 
      throw new UnauthorizedException('Access token is missing');
    
    try {
      const decodedData = this.jwtService.verifyToken(accessToken);
      const {id} = await this.userServices.getUserByEmail(decodedData.email)
      req.body.id = id;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}