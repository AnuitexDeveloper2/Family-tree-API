import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMemberDTO {

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    surname: string;

    @IsOptional()
    @IsString()
    birthDate: string;

    @IsOptional()
    @IsString()
    birthPlace: string;

    @IsOptional()
    @IsNumber()
    deathYear: number;

    @IsOptional()
    @IsNumber()
    birthYear: number;

    @IsOptional()
    @IsString()
    deathDate: string;

    @IsOptional()
    @IsString()
    biography: string;
}