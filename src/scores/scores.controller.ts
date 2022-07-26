import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationInterface } from '../middleware/interfaces/pagination.interface';
import {
  ScoreInferface,
  ScoresResponseInterface,
} from './interfaces/scores-response.interface';
import { ScoresService } from './scores.service';
import { LocationInterface } from '../middleware/interfaces/location.interface';

@ApiTags('Scores')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get scores by grid id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Successfully',
    type: ScoresResponseInterface,
  })
  async findOneByGridId(
    @Query()
    pagination: PaginationInterface,
    @Param('id') id: string,
  ) {
    return await this.scoresService.findOneByGridId(+id, pagination);
  }

  @Get(':id/location')
  @ApiOperation({ summary: 'Get score by grid id and a specific location' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Successfully',
    type: ScoreInferface,
  })
  async findOneByGridIdAndLocation(
    @Query()
    location: LocationInterface,
    @Param('id') id: string,
  ) {
    return await this.scoresService.findOneByGridIdAndLocation(+id, location);
  }
}
