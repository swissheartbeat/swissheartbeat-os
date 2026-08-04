import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { SignalModule } from './signal/signal.module';
import { EvidenceModule } from './evidence/evidence.module';
import { AnalysisModule } from './analysis/analysis.module';
import { CollectorModule } from './collector/collector.module';

@Module({
  imports: [
    PrismaModule,
    SignalModule,
    EvidenceModule,
    AnalysisModule,
    CollectorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}