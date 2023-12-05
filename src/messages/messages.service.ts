import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMessageDto } from './dto/messages.dto';
import { IMessageResponse } from './interfaces/messages.interfaces';
import { MyGateway } from 'src/gateway/gateway';

@Injectable()
export class MessagesService {

    constructor(
        private prisma: PrismaService,
        private gateway: MyGateway
    ) {}

    async createMessage(data: CreateMessageDto, roomId: string, userId: string): Promise<IMessageResponse> {
        const roomExists = await this.prisma.rooms.findUnique({
            where: {id: roomId}
        })

        if (!roomExists) {
            throw new NotFoundException("Room not found")
        }

        const createMessage = await this.prisma.messages.create({
            data: {
                ...data,
                room_id: roomId,
                user_id: userId
            },
            select: {
                id: true,
                content: true,
                created_at: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                room: {
                    select: {
                        id: true,
                        name: true,
                        description: true,

                    }
                }
            }
        })

        this.gateway.sendMessage(createMessage)
        
        return createMessage
    }
}