import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/users.dto';
import { UserResponse } from './interfaces/users.interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: CreateUserDto): Promise<UserResponse> {

        const emailExists = await this.prisma.users.findUnique({
            where: {email: data.email}
        })

        if (emailExists) {
            throw new ConflictException("Email already used");
        }

        data.password = await bcrypt.hash(data.password, 10);
        
        return this.prisma.users.create({
          data,
          select: {
            id: true,
            name: true,
            email: true,
          }
        });
    }

}