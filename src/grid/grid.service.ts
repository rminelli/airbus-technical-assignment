import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalyserService } from '../analyser/analyser.service';
import { Repository } from 'typeorm';
import { CreateGridDto } from './dto/create-grid.dto';
import { Grid } from './entities/grid.entity';

@Injectable()
export class GridService {
  constructor(
    @InjectRepository(Grid)
    private readonly gridRepository: Repository<Grid>,
    private readonly analyserService: AnalyserService,
  ) {}
  async create(createGridDto: CreateGridDto) {
    const datasetResult = await this.gridRepository.save(createGridDto);
    await this.analyserService.analyzeTheGrid(
      datasetResult.id,
      createGridDto.grid,
      createGridDto.size,
    );

    return { id: datasetResult.id };
  }
}
