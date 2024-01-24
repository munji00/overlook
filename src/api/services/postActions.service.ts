import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PostLikes  from '../../database/models/post/postLikes.entity';
import PostComments from 'src/database/models/post/comments.entity';
import { PostCommentsDto, PostLikesDto } from '../dto/postAction.dto';

@Injectable()
export class PostActionsService {

    constructor(
        @InjectRepository(PostLikes) private postLikesRepository: Repository<PostLikes>,
        @InjectRepository(PostComments) private postCommentsRepository: Repository<PostComments>,
        //@InjectRepository(PostComments) private postCommentsRepository: Repository<PostComments>
    ) { }

    async likePostToggle(likesData:PostLikesDto): Promise<string> {
        const { postId, userId} = likesData
        const alreadyLike = await this.postLikesRepository.findOne({where: {postId, userId}})
        if(!alreadyLike){
            const newLike = await this.postLikesRepository.create(likesData);
            await this.postLikesRepository.save(newLike);
            return "like";
        }
        await this.postLikesRepository.delete(alreadyLike.id)
        return "unlike";
    }


    async commentsOnPost(commentsData:PostCommentsDto): Promise<PostComments> {
        const newComment = await this.postCommentsRepository.create(commentsData);
        return await this.postCommentsRepository.save(newComment);
    }


    async uncommentsOnPost(id: number): Promise<boolean> {
        const result = await this.postCommentsRepository.delete(id);
        return result.affected>0
    }
}