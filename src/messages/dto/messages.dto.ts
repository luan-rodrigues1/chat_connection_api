import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    content: string
}

export class UpdateMessageDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    content: string
}