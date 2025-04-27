import { IsOptional, IsString } from "class-validator";

export class GetMemberDataDTO {
    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    surname?: string;

    @IsString()
    @IsOptional()
    birthYear?: string;
}