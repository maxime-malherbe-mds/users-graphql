import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ListFilter } from './entities/filters.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const loginUsers = await this.findOne({ login: createUserInput.login });
    if (!!loginUsers) {
      throw new ConflictException('existing login');
    }
    const emailUser = await this.usersRepository.findOneBy({
      email: createUserInput.email,
    });
    if (emailUser != null) {
      throw new ConflictException('existing email');
    }

    return this.usersRepository.save({
      ...createUserInput,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(filter: ListFilter): Promise<User> {
    const user = await this.usersRepository.findOneBy(filter)
    if (user == null) {
      throw new NotFoundException('user not found');
    }
    return user;
  }


  async update(id: number, updateUserDto: UpdateUserInput): Promise<void> {
    const result = await this.usersRepository.update(id, {
      ...updateUserDto,
      updatedAt: new Date(),
    });
    if (result.affected == 0) {
      throw new NotFoundException('user not found');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException('user not found');
    }
  }
}