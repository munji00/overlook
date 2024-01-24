import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActionsService } from '../services/userAction.service';
import { verifyUser } from '../../common/middlewares/verifyUser';
import { UserActionsController } from '../controllers/userAction.controller';
import UserAction from 'src/database/models/user/userAction.entity';
import { SharedModule } from '../../shared/modules/shared.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserAction]), SharedModule],
  providers: [ UserActionsService,JwtService ],
  controllers: [UserActionsController],
})

export class UserActionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyUser).forRoutes('suggestions');
  }
}