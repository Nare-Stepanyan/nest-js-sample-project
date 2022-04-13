import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Client } from './client.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(Client)
export class ClientsRepository extends Repository<Client> {
  async createClient(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { name, password } = authCredentialsDto;
    const client = this.create({
      username: name,
      password,
    });
    try {
      await this.save(client);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
