import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth/auth.module';
import * as dotenv from "dotenv";
import { MembersModule } from 'modules/members/members.module';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    AuthModule,
    MembersModule
  ],
})
export class AppModule { }
