import { Injectable } from '@nestjs/common';

import {
  EvidenceProvider,
  EvidenceResult,
} from './provider.interface';

@Injectable()
export class SwissinfoProvider implements EvidenceProvider {
  readonly name = 'Swissinfo';

  async search(query: string): Promise<EvidenceResult[]> {
    console.log(`🔎 ${this.name} Provider sucht nach: ${query}`);

    // Dummy Provider
    // Im nächsten Schritt ersetzen wir dies durch die echte RSS-Suche.

    return [
      {
        source: this.name,
        url: `https://www.swissinfo.ch/eng/search?query=${encodeURIComponent(query)}`,
        headline: query,
        summary: `Dummy Swissinfo Evidence for "${query}"`,
        publishedAt: new Date(),
        credibility: 95,
      },
    ];
  }
}