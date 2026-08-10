import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { EvidenceController } from './evidence.controller';
import { EvidenceService } from './evidence.service';

import { ProviderManager } from './providers/provider.manager';

import { SrfProvider } from './providers/srf.provider';
import { SwissinfoProvider } from './providers/swissinfo.provider';

@Module({
  imports: [
    PrismaModule,
  ],

  controllers: [
    EvidenceController,
  ],

  providers: [
    EvidenceService,
    ProviderManager,
    SrfProvider,
    SwissinfoProvider,
  ],

  exports: [
    EvidenceService,
    ProviderManager,
    SrfProvider,
    SwissinfoProvider,
  ],
})
export class EvidenceModule {}