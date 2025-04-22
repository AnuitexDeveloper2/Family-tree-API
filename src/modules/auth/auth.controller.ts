import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Public } from "./decorators/public-route.decorator";
import { AuthService } from "./auth.service";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post("register")
  @HttpCode(200)
  async registerUser(@Body() dto: RegisterDTO) {
    const data = await this.authService.register(dto);

    return { message: "User registered successfully!", data };
  }

  @Public()
  @Post("login")
  @HttpCode(200)
  async login(@Body() dto: LoginDTO) {
    const data = await this.authService.login(dto);

    return { message: "User login successfully!", data };
  }

}
