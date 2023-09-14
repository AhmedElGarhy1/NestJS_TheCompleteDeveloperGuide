import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findAll() {
    return this.userRepo.find();
  }

  async create(email: string, password: string) {
    const user = this.userRepo.create({ email, password });
    return this.userRepo.save(user);
  }

  async findById(id: number) {
    if (!id) {
      throw new NotFoundException('couldent find the user');
    }
    const user = await this.userRepo.findOneBy({ id });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    return user;
  }

  async deleteById(id: number) {
    if (!id) {
      throw new NotFoundException('couldent find the user');
    }
    const user = await this.userRepo.findOneBy({ id });
    return this.userRepo.remove(user);
  }

  async update(id: number, userData: Partial<User>) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException("Coulden't Find this User");
    Object.assign(user, userData);
    return this.userRepo.save(user);
  }
}
