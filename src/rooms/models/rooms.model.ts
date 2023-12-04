import { Prisma } from "@prisma/client";

export class rooms implements Prisma.roomsCreateInput {
    id?: string;
    name: string;
    description: string;
    created_at?: string | Date;
    updated_at?: string | Date;
    user: Prisma.usersCreateNestedOneWithoutRoomsInput;
    messages?: Prisma.messagesCreateNestedManyWithoutRoomInput;
}