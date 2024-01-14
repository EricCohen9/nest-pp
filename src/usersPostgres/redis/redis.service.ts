// redis.service.ts
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { UserG } from '../entities/user-g.entity';

@Injectable()
export class RedisService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      port: 17818,
      host: 'redis-17818.c135.eu-central-1-1.ec2.cloud.redislabs.com',
      password: 'J5U2IHHj7zSIO5fZDNXBtWGqlw4k8iTZ',
    });
  }

  publish(channel: string, message: any) {
    this.redis.publish(channel, JSON.stringify(message));
  }

  async getUsersFromCache(): Promise<UserG[]> {
    const usersJson = await this.redis.get('users');
    return usersJson ? JSON.parse(usersJson) : null;
  }

  setUsersInCache(users: UserG[]): void {
    this.redis.set('users', JSON.stringify(users));
    this.publish('allUsersChanged', { event: 'updated', data: users });
  }
}
