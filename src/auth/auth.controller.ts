import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDto } from "./dto/login.dto";
import { ITokenResponse } from "./interfaces/auth.interfaces";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/login")
    @HttpCode(200)
    async login(@Body() loginData: loginDto): Promise<ITokenResponse> {
        return await this.authService.login(loginData)
    }

}