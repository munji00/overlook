// auth/jwt.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { authController } from './auth.controller';
import { UsersService } from '../services/user.service';
import { SharedModule } from '../../shared/modules/shared.module';
import { ExistenceCheckInterceptor } from '../../common/interceptors/isUserExist';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../../database/models/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({secret:"jdsh%79&adh$hgsdg&%ghsd$",signOptions:{expiresIn:'24h'},}), SharedModule],
  controllers:[authController],
  providers: [UsersService,JwtService, {provide: 'ExistenceCheckInterceptor', useClass:ExistenceCheckInterceptor},]
})
export class AuthModule {}