import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MemberDocument = Member & Document

@Schema()
export class Member {
    @Prop()
    name: string;

    @Prop()
    birthDay: string;

    @Prop()
    deathDay: string;

    @Prop()
    biography: string;

    @Prop()
    photosUrl: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
