import { Grid } from '../../grid/entities/grid.entity';

export class CreateScoreDto {
  x: number;

  y: number;

  score: number;

  grid: Partial<Grid>;
}
