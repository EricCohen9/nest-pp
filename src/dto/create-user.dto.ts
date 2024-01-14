// rest api 
// export class CreateUserDto {
//     readonly name: string;
//     readonly age: number;
//     readonly password:string;
//     readonly email:string;
//   }


// graphql mongo
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  readonly name: string;

  @Field(() => Int)
  readonly age: number;

  @Field()
  readonly email: string;

  @Field()
  readonly password: string;
}


// graphql postgres




