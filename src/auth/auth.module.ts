import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsRepository } from './clients.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClientsRepository])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
