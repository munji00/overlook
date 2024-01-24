export class CreatePostDto{
   tags:string;
   description:string;
   content:string;
   userId:number;
   createdAt:Date;
}

export  class FetchPostDto{
   id:number;
   tags:string;
   description:string;
   content:string;
   userId:number;
   createdAt:Date;
}

export class UpdatePostDto{
   tags?:string;
   contenet?:string;
   description?:string;
}