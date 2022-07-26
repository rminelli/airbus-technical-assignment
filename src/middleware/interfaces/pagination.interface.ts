import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationInterface {
  @ApiPropertyOptional()
  pageSize: number;

  @ApiPropertyOptional()
  currentPage: number;

  @ApiPropertyOptional({ description: 'Order by score' })
  desc: boolean;

  order: 'DESC' | 'ASC';
}
