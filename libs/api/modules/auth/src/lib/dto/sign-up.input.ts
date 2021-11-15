import { ProfileCreateInput } from '@generated/profile/profile-create.input';
import { UserCreateInput } from '@generated/user/user-create.input';
import { InputType, IntersectionType, PickType } from '@nestjs/graphql';

@InputType()
export class SignUpInput extends IntersectionType(
  PickType(UserCreateInput, ['email', 'password'] as const),
  PickType(ProfileCreateInput, ['firstName', 'lastName'] as const)
) {}
