import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Request, UseGuards } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto, UpdateRoomDto } from "./dto/rooms.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { ITokenUserRequest } from "src/auth/interfaces/auth.interfaces";
import { IRoomResponse, IRoomResponseWithRelations } from "./interfaces/rooms.interfaces";
import { rooms } from "@prisma/client";

@Controller("rooms")
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Post()
    @UseGuards(AuthGuard)
    async create(
        @Body() createRoomDto: CreateRoomDto, 
        @Request() requestData: ITokenUserRequest
    ): Promise<IRoomResponse> {
        return await this.roomsService.createRoom(createRoomDto, requestData.user.sub);
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(): Promise<IRoomResponseWithRelations[]> {
        return await this.roomsService.findAllRooms();
    }

    @Get("/:id")
    @UseGuards(AuthGuard)
    async findOne(
        @Param("id", ParseUUIDPipe) id: string,
    ): Promise<IRoomResponseWithRelations> {
        return await this.roomsService.findOneRoom(id);
    }

    @Put("/:id")
    @UseGuards(AuthGuard)
    async update(
        @Param("id", ParseUUIDPipe) id: string, 
        @Body() updateRoomDto: UpdateRoomDto, 
        @Request() requestData: ITokenUserRequest
    ): Promise<IRoomResponse> {
        return await this.roomsService.updateRoom(id, updateRoomDto, requestData.user.sub);
    }

    @Delete("/:id")
    @UseGuards(AuthGuard)
    @HttpCode(204)
    async Delete(
        @Param("id", ParseUUIDPipe) id: string,
        @Request() requestData: ITokenUserRequest
    ): Promise<rooms> {
        return await this.roomsService.removeRoom(id, requestData.user.sub);
    }
}