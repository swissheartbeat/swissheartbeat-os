import { Controller, Param, Post } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post(':signalId')
  analyze(@Param('signalId') signalId: string) {
    return this.analysisService.analyze(signalId);
  }
}