import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationInterface } from '../middleware/interfaces/location.interface';
import { PaginationInterface } from '../middleware/interfaces/pagination.interface';
import { Repository } from 'typeorm';
import { Score } from './entities/score.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private readonly gridRepository: Repository<Score>,
  ) {}
  async findOneByGridId(id: number, pagination: PaginationInterface) {
    const scoreResult = await this.gridRepository.find({
      where: { grid: { id } },
      skip: pagination.currentPage * pagination.pageSize,
      take: pagination.pageSize,
      order: { score: pagination.order },
    });
    return { scores: scoreResult };
  }

  async findOneByGridIdAndLocation(id: number, location: LocationInterface) {
    return await this.gridRepository.findOne({
      where: { grid: { id }, x: location.x, y: location.y },
    });
  }
}
