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

  @Controller("auth")
  export class AuthController {
    constructor() {}
  
    @Public()
    @Post("register")
    @HttpCode(200)
    async registerUser() {
    //   const data = await this.authService.register(registerDTO);
  
      return { message: "User registered successfully!", data: "Ok" };
    }
  
    @Public()
    @Post("login")
    @HttpCode(200)
    async login() {
    //   const data = await this.authService.login(loginDTO);
  
      return { message: "User login successfully!", data: "Ol" };
    }

  }
  