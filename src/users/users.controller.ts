import {
    Controller,
    Post,
    Body,
    Get,
    ParseUUIDPipe,
    Param,
    Put,
    Delete,
    HttpCode,
    UseGuards,
    Request
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./dto/users.dto";
import { IUserResponse } from "./interfaces/users.interfaces";
import { users } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { ITokenUserRequest } from "src/auth/interfaces/auth.interfaces";

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
    @UseGuards(AuthGuard)
    async update(
        @Param("id", ParseUUIDPipe) id: string, 
        @Body() updateUserDto: UpdateUserDto,
        @Request() requestData: ITokenUserRequest
        ): Promise<IUserResponse> {
            
        return await this.usersService.updateUser(id, updateUserDto, requestData.user.sub);
    }

    @Delete("/:id")
    @UseGuards(AuthGuard)
    @HttpCode(204)
    async remove(
        @Param("id", ParseUUIDPipe) id: string,
        @Request() requestData: ITokenUserRequest
    ): Promise<users> {
        return await this.usersService.removeUser(id, requestData.user.sub);
    }
}