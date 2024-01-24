import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostActionsService } from '../services/postActions.service';
import { verifyUser } from '../../common/middlewares/verifyUser';
import { PostActionsController } from '../controllers/postActions.controller';
import PostLikes from 'src/database/models/post/postLikes.entity';
import PostComments from 'src/database/models/post/comments.entity';
import { SharedModule } from '../../shared/modules/shared.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([PostLikes, PostComments]), SharedModule],
  providers: [ PostActionsService,JwtService ],
  controllers: [PostActionsController],
})

export class PostActionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyUser).forRoutes('post-activities');
  }
}