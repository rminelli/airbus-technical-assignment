import { ApiPropertyOptional } from '@nestjs/swagger';

export class LocationInterface {
  @ApiPropertyOptional()
  x: number;

  @ApiPropertyOptional()
  y: number;
}
