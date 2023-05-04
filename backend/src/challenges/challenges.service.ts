import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Challenge } from './entities/challenge.entity';
import { Content } from '../contents/entities/content.entity';

import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private challengesRepository: Repository<Challenge>,
    @InjectRepository(Content) private contentsRepository: Repository<Content>,
  ) {}
  async create(createChallengeDto: CreateChallengeDto) {
    return this.challengesRepository.save(createChallengeDto);
  }

  findAll() {
    return this.challengesRepository.find({ order: { id: 'desc' } });
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

  getContents(id: number) {
    return this.contentsRepository.find({
      relations: { user: true },
      where: { challenge: { id } },
      order: { likes: 'DESC' },
    });
  }
}
