import { Injectable } from '@nestjs/common';

import {
  EvidenceProvider,
  EvidenceResult,
} from './provider.interface';

@Injectable()
export class SrfProvider implements EvidenceProvider {
  async search(query: string): Promise<EvidenceResult[]> {
    console.log(`🔎 SRF Provider sucht nach: ${query}`);

    // Hier kommt später die echte Suche
    return [];
  }
}