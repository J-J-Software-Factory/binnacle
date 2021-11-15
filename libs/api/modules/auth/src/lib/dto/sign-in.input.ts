import { UserCreateInput } from '@generated/user/user-create.input';
import { InputType, PickType } from '@nestjs/graphql';

@InputType()
export class SignInInput extends PickType(UserCreateInput, ['email', 'password']) {}
