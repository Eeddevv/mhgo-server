import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) {}

  async create(firstName:string, email: string, pass:string): Promise<User> {
    return this.usersRepository.create({ email: email, password: pass, firstName: firstName });
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: email } });
  }
  async findByUid(uid: string, options?: any): Promise<User | undefined> {
    return this.usersRepository.findByPk(uid, options);
  }
  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }
  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    user.set({
      ...updateUserDto
    })
    return user.save();
  }
}