     import { Injectable } from '@nestjs/common';
import { Evidence } from '@prisma/client';

@Injectable()
export class CredibilityService {
  calculate(evidences: Evidence[]): number | null {
    const values = evidences
      .map((e) => e.credibility)
      .filter((v): v is number => v !== null);

    if (values.length === 0) {
      return null;
    }

    const total = values.reduce((sum, value) => sum + value, 0);

    return total / values.length;
  }
}