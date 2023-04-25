import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';

import { Content } from '../contents/entities/content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, Content])],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
