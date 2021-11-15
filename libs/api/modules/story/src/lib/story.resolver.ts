import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';

@Authorize()
@Resolver(() => Story)
export class StoryResolver {
  constructor(private storyService: StoryService) {}

  @Query(() => [Story])
  async story(@Args() args: FindManyStoryArgs, @Info() info: GraphQLResolveInfo): Promise<Story[]> {
    const select = new PrismaSelect(info).value;
    return this.storyService.get(args, select);
  }

  @Mutation(() => Story)
  async storyCreate(@Args('data') data: StoryCreateInput): Promise<Story> {
    return this.storyService.create(data);
  }

  @Mutation(() => Story)
  async storyUpdate(
    @Args('data') data: StoryUpdateInput,
    @Args('where') where: StoryWhereUniqueInput
  ): Promise<Story> {
    return this.storyService.update(data, where);
  }

  @Mutation(() => Story)
  async storyDelete(@Args('where') where: StoryWhereUniqueInput): Promise<Story> {
    return this.storyService.delete(where);
  }
}
