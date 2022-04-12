import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UserStatus } from './user-status.enum';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('user');
    if (status) {
      query.andWhere('user.status = :status', { status });
    }
    if (search) {
      query.andWhere('LOWER(user.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }
    const users = await query.getMany();
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name } = createUserDto;
    const user = this.create({
      name,
      status: UserStatus.ACTIVE,
    });
    await this.save(user);
    return user;
  }
}
