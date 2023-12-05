import { 
    WebSocketGateway, 
    WebSocketServer 
} from "@nestjs/websockets";
import { Server } from 'socket.io';
import { IMessageResponse } from "src/messages/interfaces/messages.interfaces";

@WebSocketGateway({
    cors: {
        origin: "*",
        credentials: true,
    },
    pingInterval: 10000,
    pingTimeout: 15000,
})
export class MyGateway {
    
    @WebSocketServer()
    server: Server


    sendMessage(messageData: IMessageResponse) {
        
        this.server.emit(messageData.room.id, {
            content: messageData.content,
            created_at: messageData.created_at,
            user: {
                id: messageData.user.id,
                name: messageData.user.name
            }
        }) 
    }

}