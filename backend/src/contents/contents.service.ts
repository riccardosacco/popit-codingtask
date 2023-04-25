import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Content } from './entities/content.entity';

import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content)
    private contentsRepository: Repository<Content>,
  ) {}
  create(createContentDto: CreateContentDto) {
    return this.contentsRepository.create(createContentDto);
  }

  findAll() {
    return this.contentsRepository.find({ relations: { challenge: true } });
  }

  findOne(id: number) {
    return this.contentsRepository.findOneBy({ id });
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return this.contentsRepository.update({ id }, updateContentDto);
  }

  remove(id: number) {
    return this.contentsRepository.delete({ id });
  }
}
