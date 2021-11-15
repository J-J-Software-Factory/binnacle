import { EnumUserStatusFieldUpdateOperationsInput } from '@generated/prisma/enum-user-status-field-update-operations.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserStatusInput {
  @Field(() => EnumUserStatusFieldUpdateOperationsInput, { nullable: true })
  status?: EnumUserStatusFieldUpdateOperationsInput;
}
