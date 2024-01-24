import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './database/models/user/user.entity'
import Post from './database/models/post/post.entity'
import PostComments from './database/models/post/comments.entity';
import UserActions from './database/models/user/userAction.entity';
import {config} from 'dotenv'
import { UsersModule } from './api/modules/user.module';
import { AuthModule } from './api/auth/auth.module';
import { PostModule } from './api/modules/post.module';
import { UserActionsModule } from './api/modules/userActions.module';
import PostLikes from './database/models/post/postLikes.entity';
import { PostActionsModule } from './api/modules/postActions.module';
import UserAssets from './database/models/user/userAssets.entity';

config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host:process.env.DB_HOST,
    port: 3306,
    username:process.env.DB_USERNAME || 'root',
    password:process.env.DB_PASSWORD || 'root',
    database:process.env.DB_NAME,
    entities: [User , Post, PostComments, UserActions, PostLikes, UserAssets],
    synchronize: true
  }), UsersModule, AuthModule, PostModule, UserActionsModule, PostActionsModule]
})
export class AppModule { }
