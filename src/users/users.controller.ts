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
import { UserResponse } from "./interfaces/users.interfaces";
import { users } from "@prisma/client";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
        return await this.usersService.createUser(createUserDto);
    }

    @Get()
    async findAll(): Promise<UserResponse[]> {
        return await this.usersService.findAllUsers();
    }

    @Get("/:id")
    async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<UserResponse> {
        return await this.usersService.findOneUser(id);
    }

    @Put("/:id")
    async update(
        @Param(
            "id", ParseUUIDPipe) id: string, 
            @Body() updateUserDto: UpdateUserDto
        ): Promise<UserResponse> {
            
        return await this.usersService.updateUser(id, updateUserDto);
    }

    @Delete("/:id")
    @HttpCode(204)
    async remove(@Param("id", ParseUUIDPipe) id: string): Promise<users> {
        return await this.usersService.removeUser(id);
    }
}