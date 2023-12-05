import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma.service";

@Module({
    imports: [ 
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY, 
            signOptions: {expiresIn: "24h"}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService]
})
export class AuthModule {}