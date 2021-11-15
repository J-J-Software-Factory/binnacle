import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryResolver } from './story.resolver';

@Module({
  controllers: [],
  providers: [StoryService, StoryResolver],
  exports: [],
})
export class StoryModule {}
