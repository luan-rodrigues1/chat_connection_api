import { IUserResponse } from "src/users/interfaces/users.interfaces"

export interface IRoomResponse {
    id: string
    name: string
    description: string
}

export interface IRoomResponseWithRelations {
    id: string
    name: string
    description: string
    created_at: Date
    user: IUserResponse
}