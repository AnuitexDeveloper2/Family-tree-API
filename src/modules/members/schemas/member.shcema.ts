import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MemberDocument = Member & Document

@Schema()
export class Member {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    surname: string;

    @Prop()
    birthYear: number;

    @Prop()
    birthPlace: string;

    @Prop()
    birthDate: string;

    @Prop()
    deathYear: number;

    @Prop()
    deathDate: string;

    @Prop()
    biography: string;

    @Prop()
    photosUrl: string[];
}

export const MemberSchema = SchemaFactory.createForClass(Member);
