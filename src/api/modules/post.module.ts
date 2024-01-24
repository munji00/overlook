import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from '../services/post.service';
import { verifyUser } from '../../common/middlewares/verifyUser';
import { PostController } from '../controllers/post.controller';
import Post from 'src/database/models/post/post.entity';
import { SharedModule } from '../../shared/modules/shared.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), SharedModule],
  providers: [ PostService,JwtService ],
  controllers: [PostController],
})

export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyUser).forRoutes('post');
  }
}