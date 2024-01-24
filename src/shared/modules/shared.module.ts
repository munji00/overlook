import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User  from '../../database/models/user/user.entity';
import { JwtService } from '../../api/auth/jwt.service';
import { UsersService } from '../../api/services/user.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],  
  providers: [JwtService, UsersService],
  exports: [JwtService, UsersService], 
})
export class SharedModule {}