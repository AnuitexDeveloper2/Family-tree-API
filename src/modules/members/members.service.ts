import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from './schemas/member.shcema';
import { Model } from 'mongoose';

@Injectable()
export class MembersService{

    constructor(@InjectModel(Member.name) private memberModel: Model<MemberDocument>) {   }

    async getMemberDetails() {

    }

    async create(data: Partial<Member>): Promise<Member> {
        const member = new this.memberModel(data);
        return member.save();
      }
    
      async findAll(): Promise<Member[]> {
        return this.memberModel.find().exec();
      }
    
      async findOne(id: string): Promise<Member | null> {
        return this.memberModel.findById(id).exec();
      }
}
