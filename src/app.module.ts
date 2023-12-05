import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.modulo';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [UsersModule, AuthModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
