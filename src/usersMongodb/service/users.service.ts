// users/services/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { User } from '../models/user.model';
import { User } from '../models/user.modelgql';
import { CreateUserDto } from '../../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
  console.log(createdUser,"userDto service");
  const savedUser = await createdUser.save();
  return savedUser;
  }
  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    console.log(users);
    
    return users;
  }
}
