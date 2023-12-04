import { Prisma } from "@prisma/client";

export class users implements Prisma.usersCreateInput {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at?: Date;
    rooms?: Prisma.roomsCreateNestedManyWithoutUserInput;
    messages?: Prisma.messagesCreateNestedManyWithoutUserInput;
}