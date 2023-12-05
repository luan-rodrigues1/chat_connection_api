import { IRoomResponse } from "src/rooms/interfaces/rooms.interfaces"
import { IUserResponse } from "src/users/interfaces/users.interfaces"

export interface IMessageResponse {
    id: string
    content: string
    created_at: Date
    user:IUserResponse
    room: IRoomResponse
}