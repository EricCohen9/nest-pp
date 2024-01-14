import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../controller/users.controllers';
import { UserService } from '../service/users.service';
// import { UserModelSchema } from '../models/user.model';
import { User , UserModelSchema } from '../models/user.modelgql';
import { UsersResolver } from '../resolver/users.resolver';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/stockManager'),
    MongooseModule.forFeature([{ name: 'User', schema: UserModelSchema }]),
  ],
  providers: [UserService,UsersResolver],
})
export class UsersModule {}