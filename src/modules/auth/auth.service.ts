import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createHash } from "crypto";
import { User, UserDocument } from 'modules/users/schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async register(dto: RegisterDTO) {
        const hashedPassword = this.hashPassword(dto.password)
        const user = await new this.userModel({ ...dto, password: hashedPassword })
        return this.login({ email: user.email, password: dto.password })

    }

    async login(dto: LoginDTO) {
        const user = await this.userModel.findOne({ email: dto.email })
        if (!user) {
            throw new BadRequestException("Неправильный эмейл");
        }
        if (!this.checkPassword(dto.password, user.password)) {
            throw new BadRequestException("Неправильный пароль");
        }
    }

    hashPassword = (password: string): string =>
        createHash("md5").update(password).digest("hex");

    checkPassword = (password: string, hashedPassword: string): boolean =>
        hashedPassword === this.hashPassword(password);
}
