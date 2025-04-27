import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from './schemas/member.shcema';
import { Model } from 'mongoose';
import { GetMemberDataDTO } from './dto/get-member-details.dto';

@Injectable()
export class MembersService{

    constructor(@InjectModel(Member.name) private memberModel: Model<MemberDocument>) {   }

    async getMemberDetails(dto: GetMemberDataDTO) {
        const { firstName, lastName, surname, birthYear } = dto;

        const query: any = {};

        if (firstName) {
            query.firstName = firstName;
        }
        if (lastName) {
            query.lastName = lastName;
        }
        if (surname) {
            query.surname = surname;
        }
        if (birthYear && birthYear !== '?') {
            query.birthYear = birthYear;
        }

        return this.memberModel.find(query).exec();
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
