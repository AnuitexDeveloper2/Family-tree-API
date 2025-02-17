import { IsOptional, IsString } from "class-validator";

export class CreateMemberDTO {

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    birthDay: string;

    @IsOptional()
    @IsString()
    deathDay: string;

    @IsOptional()
    @IsString()
    biography: string;

}