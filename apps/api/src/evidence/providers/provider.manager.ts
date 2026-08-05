import { Injectable } from '@nestjs/common';

import { SrfProvider } from './srf.provider';
import { EvidenceProvider } from './provider.interface';

@Injectable()
export class ProviderManager {
  constructor(
    private readonly srfProvider: SrfProvider,
  ) {}

  getProviders(): EvidenceProvider[] {
    return [
      this.srfProvider,
    ];
  }
}