import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserActions from '../../database/models/user/userAction.entity';
import { SendFriendRequestDto } from '../dto/userActions.dto';

@Injectable()
export class UserActionsService {

   constructor(@InjectRepository(UserActions) private userActionsRepository: Repository<UserActions>) { }

   async createUserAction(userActionData:any): Promise<any> {
        const newUserAction = await this.userActionsRepository.create(userActionData);
        return await this.userActionsRepository.save(newUserAction);
    }

    async getUserActions(id:number): Promise<UserActions[]> {
        return  await this.userActionsRepository.find({where: [{ friId: id },{ fraId:id}], relations:['fri' , 'fra']}); 
    }


    async updateUserAction(id: number): Promise<UserActions | undefined> {
        const userAction = await this.userActionsRepository.findOne({where: { id }});
        if (!userAction) 
          return undefined;

        this.userActionsRepository.merge(userAction, {isAccepted:true});
        return this.userActionsRepository.save(userAction);
    }


     async deleteUserAction(id: number): Promise<boolean> {
        const result = await this.userActionsRepository.delete(id);
        return result.affected > 0
    }
}