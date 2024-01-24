export class SignupDto{
    id?:number;
    username:string;
    name:string;
    email:string;
    password:string
}


export class LoginDto{
    email:string;
    password:string;
}