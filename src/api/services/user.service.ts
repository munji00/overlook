import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User  from '../../database/models/user/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

   async createUser(user:User): Promise<User> {
        const newUser = await this.usersRepository.create(user);
        return await this.usersRepository.save(newUser);
    }


    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({relations:{posts:true}});
    }

    async getUserById(id: number): Promise<User> {
        return await this.usersRepository.findOne({where: { id }, relations:{posts:true}});
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({where: { email }});
    }

    async updateUser(id: number, updateUserDto: Partial<User>): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({where: { id }});
        if (!user) 
          return undefined;

        this.usersRepository.merge(user, updateUserDto);
        return this.usersRepository.save(user);
    }
}