import { Injectable } from '@nestjs/common';

import {
  EvidenceProvider,
  EvidenceResult,
} from './provider.interface';

@Injectable()
export class SrfProvider implements EvidenceProvider {
  readonly name = 'SRF';

  async search(query: string): Promise<EvidenceResult[]> {
    console.log(`🔎 ${this.name} Provider sucht nach: ${query}`);

    // Temporärer Dummy
    // Im nächsten Schritt wird hier der echte RSS-/API-Parser eingebaut.

    return [
      {
        source: this.name,
        url: `https://www.srf.ch/search?q=${encodeURIComponent(query)}`,
        headline: query,
        summary: `Dummy Evidence generated for "${query}"`,
        publishedAt: new Date(),
        credibility: 90,
      },
    ];
  }
}