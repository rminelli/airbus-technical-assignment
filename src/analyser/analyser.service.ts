import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from '../scores/entities/score.entity';
import { Repository } from 'typeorm';
import { CreateScoreDto } from '../scores/dto/create-score.dto';

@Injectable()
export class AnalyserService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
  ) {}
  private id: number;
  private grid: Record<string, any>;
  private size: number;

  async analyzeTheGrid(
    id: number,
    grid: Record<string, any>,
    size: number,
  ): Promise<void> {
    this.id = id;
    this.grid = grid;
    this.size = size;
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        const score = this.generateScoreByLocation(row, column);
        const createScoreDto: CreateScoreDto = {
          grid: { id },
          score,
          x: row,
          y: column,
        };
        await this.scoreRepository.save(createScoreDto);
      }
    }
  }

  private generateScoreByLocation(row: number, column: number): number {
    const isTheFirstColumn = column == 0;
    const isTheLastColumn = column == this.size - 1;

    const isTheFirstRow = row == 0;
    const isTheLastRow = row == this.size - 1;

    let score = this.grid[row][column];
    if (!isTheFirstColumn) score += this.grid[row][column - 1];

    if (!isTheLastColumn) score += this.grid[row][column + 1];

    if (!isTheFirstRow) {
      if (!isTheFirstColumn) score += this.grid[row - 1][column - 1];
      score += this.grid[row - 1][column];
      if (!isTheLastColumn) score += this.grid[row - 1][column + 1];
    }

    if (!isTheLastRow) {
      if (!isTheFirstColumn) score += this.grid[row + 1][column - 1];
      score += this.grid[row + 1][column];
      if (!isTheLastColumn) score += this.grid[row + 1][column + 1];
    }
    return score;
  }
}
