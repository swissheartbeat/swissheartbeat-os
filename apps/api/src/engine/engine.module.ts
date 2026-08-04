import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TrustEngineService } from './trust-engine.service';
import { CredibilityService } from './credibility.service';
import { ConsensusService } from './consensus.service';

@Module({
  imports: [PrismaModule],
  providers: [
    TrustEngineService,
    CredibilityService,
    ConsensusService,
  ],
  exports: [
    TrustEngineService,
  ],
})
export class EngineModule {}