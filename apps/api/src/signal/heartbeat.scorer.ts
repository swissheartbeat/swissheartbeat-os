import { Injectable } from '@nestjs/common';

export interface HeartbeatInput {
  source: string;
  category: string;
  publishedAt?: Date;
}

@Injectable()
export class HeartbeatScorer {
  calculate(input: HeartbeatInput) {
    let score = 0;
    let priority = 0;

    switch (input.source) {
      case 'SRF':
        score += 30;
        break;

      case 'NZZ':
        score += 25;
        break;

      case 'Swissinfo':
        score += 20;
        break;

      default:
        score += 10;
    }

    switch (input.category) {
      case 'News':
        score += 10;
        priority += 20;
        break;

      default:
        score += 5;
    }

    if (input.publishedAt) {
      const ageHours =
        (Date.now() - input.publishedAt.getTime()) / (1000 * 60 * 60);

      if (ageHours < 2) {
        score += 20;
        priority += 50;
      } else if (ageHours < 24) {
        score += 10;
        priority += 20;
      }
    }

    return {
      score: Math.min(score, 100),
      priority,
    };
  }
}