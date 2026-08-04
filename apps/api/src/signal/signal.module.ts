import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { SignalController } from './signal.controller';
import { SignalService } from './signal.service';
import { HeartbeatScorer } from './heartbeat.scorer';

@Module({
  imports: [PrismaModule],

  controllers: [SignalController],

  providers: [
    SignalService,
    HeartbeatScorer,
  ],

  exports: [
    SignalService,
    HeartbeatScorer,
  ],
})
export class SignalModule {}