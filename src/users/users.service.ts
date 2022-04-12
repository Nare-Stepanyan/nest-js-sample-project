import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UserStatus } from './user-status.enum';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}
  getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.usersRepository.getUsers(filterDto);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser(createUserDto);
  }

  async getUserById(id: string): Promise<User> {
    const found = await this.usersRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('User not found');
    }
    return found;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async updateUserStatus(id: string, status: UserStatus): Promise<User> {
    const user = await this.getUserById(id);
    user.status = status;
    await this.usersRepository.save(user);
    return user;
  }
}
