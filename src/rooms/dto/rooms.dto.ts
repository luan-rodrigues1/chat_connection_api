import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string
}

export class UpdateRoomDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description: string
}