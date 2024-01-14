// user-g/dto/create-user-g.input.ts

// import { InputType, Field, Int } from '@nestjs/graphql';

// @InputType()
// export class CreateUserGInput {
//   @Field({ nullable: true }) 
//   id?: number;
//   @Field()
//   name: string;

//   @Field(() => Int)
//   age: number;

//   @Field()
//   email: string;

//   @Field()
//   password: string;
// }
// user-g/dto/create-user-g.input.ts
// user-g/dto/create-user-g.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, MinLength, MaxLength, IsInt, Min, Max } from 'class-validator';

@InputType()
export class CreateUserGInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MinLength(3, { message: 'Name is too short' })
  @MaxLength(50, { message: 'Name is too long' })
  name: string;

  @Field(() => Int)
  @IsInt({ message: 'Age must be an integer' })
  @Min(0, { message: 'Age must be greater than or equal to 0' })
  @Max(150, { message: 'Age must be less than or equal to 150' })
  age: number;

  @Field()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(255, { message: 'Password is too long' })
  password: string;
}
