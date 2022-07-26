import { Module } from '@nestjs/common';
import { GridService } from './grid.service';
import { GridController } from './grid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grid } from './entities/grid.entity';
import { ParamsValidationHelper } from '../common/helpers/params-validation.helper';
import { AnalyserModule } from '../analyser/analyser.module';

@Module({
  imports: [TypeOrmModule.forFeature([Grid]), AnalyserModule],
  controllers: [GridController],
  providers: [GridService, ParamsValidationHelper],
  exports: [TypeOrmModule, GridService],
})
export class GridModule {}
