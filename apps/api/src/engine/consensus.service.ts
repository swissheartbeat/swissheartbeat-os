import { Injectable } from '@nestjs/common';
import { Evidence } from '@prisma/client';

@Injectable()
export class ConsensusService {
  calculate(evidences: Evidence[]): number {
    if (evidences.length <= 1) {
      return 0.5;
    }

    return 1.0;
  }
}