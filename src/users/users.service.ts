import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private usersModel: typeof User
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.usersModel.findAll({ include: { all: true } });
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersModel.findByPk(id, { include: { all: true } });
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersModel.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getUserByverificationId(verificationId: string): Promise<User> {
    const user = await this.usersModel.findOne({
      where: { verificationId },
      include: { all: true },
    });
    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.usersModel.create(dto, { include: { all: true } });
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.usersModel.findByPk(id, { include: { all: true } });
    await user.update(dto);
    return user;
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.usersModel.findByPk(id, { include: { all: true } });
    await user.destroy();
    return user;
  }
}
