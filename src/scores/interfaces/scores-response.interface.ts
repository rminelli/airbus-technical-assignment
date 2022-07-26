import { ApiResponseProperty } from '@nestjs/swagger';

export class ScoreInferface {
  @ApiResponseProperty()
  x: number;

  @ApiResponseProperty()
  y: number;

  @ApiResponseProperty()
  score: number;
}

export class ScoresResponseInterface {
  @ApiResponseProperty({ type: [ScoreInferface] })
  readonly scores: ScoreInferface[];
}
