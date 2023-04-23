import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Challenge } from './entities/challenge.entity';

import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private challengesRepository: Repository<Challenge>,
  ) {}
  create(createChallengeDto: CreateChallengeDto) {
    return this.challengesRepository.create(createChallengeDto);
  }

  findAll() {
    return this.challengesRepository.find();
  }

  findOne(id: number) {
    return this.challengesRepository.findOneBy({ id });
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return this.challengesRepository.update({ id }, updateChallengeDto);
  }

  remove(id: number) {
    return this.challengesRepository.delete({ id });
  }
}
