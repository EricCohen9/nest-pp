// import { Field, Int, ObjectType } from '@nestjs/graphql';
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// @ObjectType()
// export class User extends Document {
//     @Field(type => String)
//     name: string;
//     @Field(type => Int)
//     age: number;
//     @Field(type => String)
//     password: string;
//     @Field(type => String)
//     email: string;
// }
// export const UserModelSchema = SchemaFactory.createForClass(User);



// graphql mongo
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class User extends Document {
  @Field(type => String)
  @Prop({ required: true }) 
  name: string;

  @Field(type => Int)
  @Prop({ required: true })
  age: number;

  @Field(type => String)
  @Prop({ required: true })
  password: string;

  @Field(type => String)
  @Prop({ required: true })
  email: string;
}

export const UserModelSchema = SchemaFactory.createForClass(User);


// graphql postgres 
// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { ObjectType, Field, Int } from '@nestjs/graphql';

// @Entity()
// @ObjectType()
// export class User {
//   @PrimaryGeneratedColumn()
//   @Field(type => Int)
//   id: number;

//   @Column()
//   @Field(type => String)
//   name: string;

//   @Column()
//   @Field(type => Int)
//   age: number;

//   @Column()
//   @Field(type => String)
//   password: string;

//   @Column()
//   @Field(type => String)
//   email: string;
// }

