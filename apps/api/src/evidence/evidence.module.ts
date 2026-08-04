import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { EvidenceController } from './evidence.controller';
import { EvidenceService } from './evidence.service';

import { SrfProvider } from './providers/srf.provider';

@Module({
  imports: [
    PrismaModule,
  ],

  controllers: [
    EvidenceController,
  ],

  providers: [
    EvidenceService,
    SrfProvider,
  ],

  exports: [
    EvidenceService,
    SrfProvider,
  ],
})
export class EvidenceModule {}