import { CreateUserGInput } from './create-user-g.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserGInput extends PartialType(CreateUserGInput) {
  @Field(() => Int)
  id: number;
}
