import { Injectable } from '@nestjs/common';

@Injectable()
export class StoryService {
  constructor(private prisma: PrismaService) {}

  async get(args: FindManyStoryArgs, select: any): Promise<Story[]> {
    return this.prisma.story.findMany({ ...args, ...select });
  }

  async create(data: StoryCreateInput): Promise<Story> {
    return this.prisma.story.create({ data });
  }

  async update(data: StoryUpdateInput, where: StoryWhereUniqueInput): Promise<Story> {
    return this.prisma.story.update({ data, where });
  }

  async delete(where: StoryWhereUniqueInput): Promise<Story> {
    return this.prisma.story.delete({ where });
  }
}
