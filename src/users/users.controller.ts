import {
    Controller,
    Post,
    Body
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/users.dto";
import { UserResponse } from "./interfaces/users.interfaces";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
        return await this.usersService.createUser(createUserDto);
    }

}