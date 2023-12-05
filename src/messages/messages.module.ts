import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { PrismaService } from "src/prisma.service";

@Module({
    imports: [],
    controllers: [MessagesController],
    providers: [MessagesService, PrismaService]
})
export class MessagesModule {}