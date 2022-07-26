import { Module } from '@nestjs/common';
import { ScoresModule } from '../scores/scores.module';
import { AnalyserService } from './analyser.service';

@Module({
  imports: [ScoresModule],
  providers: [AnalyserService],
  exports: [AnalyserService],
})
export class AnalyserModule {}
