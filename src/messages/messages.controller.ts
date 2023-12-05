import {
    Controller,
    Post,
    UseGuards,
    Body,
    Request,
    Param,
    ParseUUIDPipe
} from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateMessageDto } from "./dto/messages.dto";
import { ITokenUserRequest } from "src/auth/interfaces/auth.interfaces";

@Controller("messages")
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post("/rooms/:id")
    @UseGuards(AuthGuard)
    async create(
        @Param("id", ParseUUIDPipe) roomId: string,
        @Body() createMessageDto: CreateMessageDto, 
        @Request() requestData: ITokenUserRequest
    ): Promise<any> {
        return await this.messagesService.createMessage(createMessageDto, roomId, requestData.user.sub);
    }

}