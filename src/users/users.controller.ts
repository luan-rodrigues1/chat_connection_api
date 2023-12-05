import {
    Controller,
    Post,
    Body,
    Get,
    ParseUUIDPipe,
    Param,
    Put,
    Delete,
    HttpCode
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./dto/users.dto";
import { IUserResponse } from "./interfaces/users.interfaces";
import { users } from "@prisma/client";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<IUserResponse> {
        return await this.usersService.createUser(createUserDto);
    }

    @Get()
    async findAll(): Promise<IUserResponse[]> {
        return await this.usersService.findAllUsers();
    }

    @Get("/:id")
    async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<IUserResponse> {
        return await this.usersService.findOneUser(id);
    }

    @Put("/:id")
    async update(
        @Param(
            "id", ParseUUIDPipe) id: string, 
            @Body() updateUserDto: UpdateUserDto
        ): Promise<IUserResponse> {
            
        return await this.usersService.updateUser(id, updateUserDto);
    }

    @Delete("/:id")
    @HttpCode(204)
    async remove(@Param("id", ParseUUIDPipe) id: string): Promise<users> {
        return await this.usersService.removeUser(id);
    }
}