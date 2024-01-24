import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../services/user.service';
import { verifyUser } from '../../common/middlewares/verifyUser';
import { UsersController } from '../controllers/user.controller';
import User from '../../database/models/user/user.entity';
import { SharedModule } from '../../shared/modules/shared.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SharedModule],
  providers: [ UsersService ,JwtService ],
  controllers: [UsersController],
})

export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyUser).forRoutes('user');
  }
}