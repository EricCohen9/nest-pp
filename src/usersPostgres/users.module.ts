import { Module } from '@nestjs/common';
import { UserGService } from './user-g.service';
import { UserGResolver } from './user-g.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserG } from './entities/user-g.entity';
import { JwtModule } from '@nestjs/jwt'; 
import { RedisService } from './redis/redis.service';
import { PubSub } from 'graphql-subscriptions';
@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'elchi',
    database: 'users',
    entities: [UserG],
    synchronize: true, 
  }),TypeOrmModule.forFeature([UserG]),JwtModule.register({
     secret: 'your-secret-key',signOptions: { expiresIn: '1h' }, }),],
  providers: [UserGResolver, UserGService,RedisService,PubSub],
})
export class UserGModule {}
