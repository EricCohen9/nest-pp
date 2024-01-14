import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserGService } from './user-g.service';
import { UserG } from './entities/user-g.entity';
import { CreateUserGInput } from './dto/create-user-g.input';
import { UpdateUserGInput } from './dto/update-user-g.input';
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { PubSub } from 'graphql-subscriptions';
import { Subscription } from '@nestjs/graphql';
import { generateUserPassword, comparePassword } from './bcrypt/bcrypt';

@Resolver(() => UserG)
export class UserGResolver {
  constructor(private readonly userGService: UserGService,
    private redisService: RedisService, private readonly pubSub: PubSub) { }

  @Mutation(() => UserG)
  @UsePipes(new ValidationPipe())
  async createUserG(@Args('createUserGInput') createUserGInput: CreateUserGInput):
    Promise<UserG> {
    createUserGInput.password = generateUserPassword(createUserGInput.password as string);
    const existingUser = await this.userGService.findByEmail(createUserGInput.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const createdUser = await this.userGService.create(createUserGInput);
    this.redisService.publish('users', {
      event: 'created',
      data: createdUser,
    });
    this.pubSub.publish('userCreated', { userCreated: createdUser });

    return createdUser;
  }
  @Query(() => [UserG], { name: 'getallusersg' })
  async findAll(): Promise<UserG[]> {
    let users: UserG[] = await this.redisService.getUsersFromCache();
    console.log('redis ');

    if (!users || users.length === 0) {
      users = await this.userGService.findAll();
      console.log('postgres');
      this.redisService.setUsersInCache(users);
    }

    return users;
  }

  @Query(() => UserG, { name: 'userG' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userGService.findOne(id);
  }

  @Mutation(() => UserG)
  updateUserG(@Args('updateUserGInput') updateUserGInput: CreateUserGInput) {
    return this.userGService.update(updateUserGInput.id, updateUserGInput);
  }

  @Mutation(() => UserG)
  removeUserG(@Args('id', { type: () => Int }) id: number) {
    return this.userGService.remove(id);
  }
  @Mutation(() => String)
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<string> {
    const user = await this.userGService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = comparePassword(password, user.password);

    if (isPasswordValid) {
      const token = await this.userGService.authenticate(email, password);
      const isTokenValid = await this.userGService.verifyToken(token);

      if (isTokenValid) {
        return token;
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Subscription((returns) => UserG)
  onUserCreated() {
    return this.pubSub.asyncIterator('userCreated');
  }

}
