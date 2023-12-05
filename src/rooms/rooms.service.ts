import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateRoomDto } from "./dto/rooms.dto";
import { IRoomResponse, IRoomResponseWithRelations } from "./interfaces/rooms.interfaces";
import { rooms } from "@prisma/client";

@Injectable()
export class RoomsService {
    constructor(private prisma: PrismaService) {}

    async createRoom(data: CreateRoomDto, userId: string): Promise<IRoomResponse> {
        return await this.prisma.rooms.create({
            data: {...data, user_id: userId},
            select: {
                id: true,
                name: true,
                description: true,
            }
        })
    }

    async findAllRooms(): Promise<IRoomResponseWithRelations[]> {
        const listRooms = await this.prisma.rooms.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                created_at: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        })

        return listRooms
    }

    async findOneRoom(roomId: string): Promise<IRoomResponseWithRelations> {
        const roomExists = await this.prisma.rooms.findUnique({
            where: {id: roomId},
            select: {
                id: true,
                name: true,
                description: true,
                created_at: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        })

        if (!roomExists) {
            throw new NotFoundException("Room not found");
        }

        return roomExists
    }

    async updateRoom(roomId: string , data: CreateRoomDto, userId: string): Promise<IRoomResponse> {

        const roomExists = await this.prisma.rooms.findUnique({
            where: {id: roomId},
            include: {
                user: true
            }
        })

        if (!roomExists) {
            throw new NotFoundException("Room not found");
        }

        if (roomExists.user.id !== userId) {
            throw new ForbiddenException("This room doesn't belong to you")
        }

        return await this.prisma.rooms.update({
            where: {
                id: roomId
            },
            data: {...data},
            select: {
                id: true,
                name: true,
                description: true,
            }
        })
        
    }

    async removeRoom(roomId: string, userId: string): Promise<rooms> {

        const roomExists = await this.prisma.rooms.findUnique({
            where: {id: roomId},
            include: {
                user: true
            }
        })

        if (!roomExists) {
            throw new NotFoundException("Room not found");
        }

        if (roomExists.user.id !== userId) {
            throw new ForbiddenException("This room doesn't belong to you")
        }

        return await this.prisma.rooms.delete({
            where: {id: roomId}
        })

    }
    
}