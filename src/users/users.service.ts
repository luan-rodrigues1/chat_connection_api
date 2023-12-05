import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { IUserResponse } from "./interfaces/users.interfaces";
import * as bcrypt from 'bcrypt';
import { users } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: CreateUserDto): Promise<IUserResponse> {

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

    async findAllUsers(): Promise<IUserResponse[]> {
        const listUsers = await this.prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return listUsers
    }

    async findOneUser(userId: string): Promise<IUserResponse> {
        const searchUser = await this.prisma.users.findUnique({
            where: {id: userId},
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        if (!searchUser) {
            throw new NotFoundException("User not found");
        }

        return searchUser
    }

    async updateUser(userId: string, data: UpdateUserDto): Promise<IUserResponse> {
        const userExists = await this.prisma.users.findUnique({
            where: {id: userId}
        })

        if (!userExists) {
            throw new NotFoundException("User not found");
        }

        if (data.email) {

            const emailExists = await this.prisma.users.findUnique({
                where: {email: data.name}
            })

            if (emailExists && emailExists.email !== userExists.email) {
                throw new ConflictException("Email already used");
            }
        }

        if (data.password) {
            data.password = await bcrypt.hash(
                data.password,
                10,
            );
        }

        const updateUser = await this.prisma.users.update({
            where: {id: userId},
            data: {...data},
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return updateUser
    }

    async removeUser(userId: string): Promise<users> {
        const searchUser = await this.prisma.users.findUnique({
            where: {id: userId}
        })

        if (!searchUser) {
            throw new NotFoundException("User not found");
        }

        return await this.prisma.users.delete({
            where: {id: userId},
        })
    }

}