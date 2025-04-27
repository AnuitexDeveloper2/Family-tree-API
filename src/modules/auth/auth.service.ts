import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createHash } from "crypto";
import { User, UserDocument } from 'modules/users/schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './types/jwt-payload.interface';
import { ParsedToken } from './types/parsed-token.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async register(dto: RegisterDTO) {
        const isUserExist = await this.userModel.countDocuments({ email: dto.email })
        if (isUserExist) {
            throw new BadRequestException("Аккаунт с таким эмейлом уже существует");
        }
        const hashedPassword = this.hashPassword(dto.password)
        const user = await new this.userModel({ ...dto, password: hashedPassword })
        await user.save();
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
        return { user, token: this.generateToken({ userId: user.id, email: user.email }) }
    }

    private generateToken({
        userId,
        email,
    }: Pick<JWTPayload, "userId" | "email">): string {
        const token = this.jwtService.sign({
            userId,
            email,
            sub: `${email}.${userId}`,
        });

        return `Bearer ${token}`;
    }

    parseToken(token: string | JWTPayload): Readonly<ParsedToken> {
        const jwtPayload =
            typeof token === "string"
                ? (this.jwtService.decode(token.replace(/^Bearer /, "")) as JWTPayload)
                : token;

        if (!jwtPayload) {
            throw new BadRequestException("Invalid token!");
        }

        const parsedToken: ParsedToken = {
            ...jwtPayload,
            profileUID: jwtPayload.sub,
            createdAt: new Date(jwtPayload.iat * 1000),
            expiresAt: new Date(jwtPayload.exp * 1000),
        };

        return parsedToken;
    }

    hashPassword = (password: string): string =>
        createHash("md5").update(password).digest("hex");

    checkPassword = (password: string, hashedPassword: string): boolean =>
        hashedPassword === this.hashPassword(password);
}
