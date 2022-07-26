import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { GridService } from './grid.service';
import { CreateGridDto } from './dto/create-grid.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamsValidationHelper } from '../common/helpers/params-validation.helper';

@ApiTags('Grid')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('grid')
export class GridController {
  constructor(
    private readonly gridService: GridService,
    private readonly paramsValidationHelper: ParamsValidationHelper,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create grid' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create successfully',
    schema: { example: { id: 0 } },
  })
  create(@Body() createGridDto: CreateGridDto) {
    try {
      createGridDto.grid = this.paramsValidationHelper.checkGrid(
        createGridDto.size,
        createGridDto.values,
      );
      return this.gridService.create(createGridDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
