import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.modulo';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [UsersModule, AuthModule, RoomsModule, MessagesModule, GatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
