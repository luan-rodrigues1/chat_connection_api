import { Prisma } from "@prisma/client";

export class messages implements Prisma.messagesCreateInput {
    id: string;
    content: string;
    created_at?: string | Date;
    user: Prisma.usersCreateNestedOneWithoutMessagesInput;
    room: Prisma.roomsCreateNestedOneWithoutMessagesInput;
}