import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comment.entity';

import { Content } from '../contents/entities/content.entity';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Content])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
