// users/resolvers/users.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../service/users.service';
import { CreateUserDto } from '../../dto/create-user.dto';
// import { User } from '../models/user.model';
import { User } from '../models/user.modelgql';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Mutation(() => User) 
  async createUser(@Args('userDto') userDto: CreateUserDto): Promise<User> {
    // console.log(userDto);
    
    try {
      const createdUser = await this.userService.createUser(userDto);
      console.log(createdUser,"createdUser resolver ");
      return createdUser;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create user.');
    }
  }
}
