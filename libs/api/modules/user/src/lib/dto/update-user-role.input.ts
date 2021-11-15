import { EnumRoleFieldUpdateOperationsInput } from '@generated/prisma/enum-role-field-update-operations.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserRoleInput {
  @Field(() => EnumRoleFieldUpdateOperationsInput, { nullable: true })
  role?: EnumRoleFieldUpdateOperationsInput;
}
