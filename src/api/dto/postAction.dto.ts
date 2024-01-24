export class PostLikesDto{
    userId:number;
    postId:number;
    reaction:string;
}

export class PostCommentsDto{
    postId:number;
    comment:string;
    createdAt:Date;
}