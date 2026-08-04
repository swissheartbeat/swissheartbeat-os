import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CredibilityService } from './credibility.service';
import { ConsensusService } from './consensus.service';

@Injectable()
export class TrustEngineService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly credibilityService: CredibilityService,
    private readonly consensusService: ConsensusService,
  ) {}

  async analyze(signalId: string) {
    const signal = await this.prisma.signal.findUnique({
      where: {
        id: signalId,
      },
      include: {
        evidences: true,
      },
    });

    if (!signal) {
      throw new NotFoundException('Signal not found');
    }

    return {
      signalId,
      sourceCount: signal.evidences.length,
      credibility: this.credibilityService.calculate(signal.evidences),
      consensus: this.consensusService.calculate(signal.evidences),
      contradictions: 0,
    };
  }
}