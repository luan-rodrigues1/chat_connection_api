import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { PrismaService } from "src/prisma.service";
import { MyGateway } from "src/gateway/gateway";

@Module({
    imports: [],
    controllers: [MessagesController],
    providers: [MessagesService, PrismaService, MyGateway]
})
export class MessagesModule {}