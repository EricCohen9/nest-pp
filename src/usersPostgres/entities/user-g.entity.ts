// user-g/entities/user-g.entity.ts

import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column 
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
@Entity()
@ObjectType()
export class UserG {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  customId: number;
  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column()
  @Field() 
  email: string;

  @Column()
  @Field()
  password: string;

}