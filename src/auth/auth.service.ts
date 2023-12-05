import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { loginDto } from "./dto/login.dto";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async login(data: loginDto) {
        const searchEmail = await this.prisma.users.findUnique({
            where: {email: data.email}
        })

        if (!searchEmail) {
            throw new UnauthorizedException("Email or password invalid")
        }

        const passwordMatch = await compare(data.password, searchEmail.password)

        if(!passwordMatch) {
            throw new UnauthorizedException("Email or password invalid")
        }

        return {access_token: await this.jwtService.signAsync({sub: searchEmail.id})}
    }

}