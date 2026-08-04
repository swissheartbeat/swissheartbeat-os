import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EngineModule } from '../engine/engine.module';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';

@Module({
  imports: [
    PrismaModule,
    EngineModule,
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService],
})
export class AnalysisModule {}