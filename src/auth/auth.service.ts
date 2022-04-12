import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsRepository } from './clients.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ClientsRepository)
    private clientsRepository: ClientsRepository,
  ) {}
  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.clientsRepository.createClient(authCredentialsDto);
  }
}
