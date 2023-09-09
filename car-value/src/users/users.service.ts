import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
<<<<<<< HEAD
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findAll() {
    return this.userRepo.find();
  }

  async create(email: string, password: string) {
    const user = this.userRepo.create({ email, password });
    return this.userRepo.save(user);
  }

  async findById(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException("Coulden't Find this User");
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    return user;
  }

  async deleteById(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException("Coulden't Find this User");
    return this.userRepo.remove(user);
  }

  async update(id: number, userData: Partial<User>) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException("Coulden't Find this User");
    Object.assign(user, userData);
    return this.userRepo.save(user);
=======
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  findOne(id: number) {
    const user = this.repo.findOne({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async update(id: number, userData: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('user not found');
    Object.assign(user, userData);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('user not found');
    return this.repo.remove([user]);
>>>>>>> 5accf3c4cdd00d9c3ab7f694f397a23d99a68f2f
  }
}
