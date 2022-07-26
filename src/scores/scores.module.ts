import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { Score } from './entities/score.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  controllers: [ScoresController],
  providers: [ScoresService],
  exports: [TypeOrmModule, ScoresService],
})
export class ScoresModule {}
