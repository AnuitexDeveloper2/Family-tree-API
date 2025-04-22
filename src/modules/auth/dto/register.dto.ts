import { isString, IsString } from "class-validator";

export class RegisterDTO {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    password: string;

    @IsString()
    email: string;

}