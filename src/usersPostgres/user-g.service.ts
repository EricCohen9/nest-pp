// user-g/user-g.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserG } from './entities/user-g.entity';
import { CreateUserGInput } from './dto/create-user-g.input';
import { Repository, FindOneOptions } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { validate } from 'class-validator';
import { Cache } from 'cache-manager';
// import { RedisService } from '@nestjs/redis';
// import { IoRedisService } from '@nestjs-modules/ioredis';



@Injectable()
export class UserGService {
  constructor(
    @InjectRepository(UserG)
    private readonly userRepository: Repository<UserG>,
    private readonly jwtService: JwtService,
    // private readonly ioRedisService: IoRedisService,
  ) { }
  async create(createUserGInput: CreateUserGInput): Promise<UserG> {
    try {
      const validationErrors = await validate(createUserGInput);
      if (validationErrors.length > 0) {
        console.log(validationErrors);
        throw new BadRequestException(validationErrors.map((error) => Object.values(error.constraints)).join(', '));
      }
      const user = this.userRepository.create(createUserGInput);
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findAll(): Promise<UserG[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserG | undefined> {
    if (id !== undefined) {
      const options: FindOneOptions<UserG> = { where: { id } } as any;
      return await this.userRepository.findOne(options);
    } else {
      return undefined;
    }
  }
  async findByEmail(email: string): Promise<UserG | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserGInput: CreateUserGInput): Promise<UserG> {
    await this.userRepository.update(id, updateUserGInput);
    return this.findOne(id);
  }
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
  async authenticate(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      const payload = { sub: user.name, email: user.email };
      return this.jwtService.sign(payload);
    }
    throw new UnauthorizedException('Invalid credentials');
  }
  async verifyToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
