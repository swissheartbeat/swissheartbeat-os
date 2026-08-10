import { Injectable } from '@nestjs/common';

import { EvidenceProvider } from './provider.interface';

import { SrfProvider } from './srf.provider';
import { SwissinfoProvider } from './swissinfo.provider';

@Injectable()
export class ProviderManager {
  constructor(
    private readonly srfProvider: SrfProvider,
    private readonly swissinfoProvider: SwissinfoProvider,
  ) {}

  getProviders(): EvidenceProvider[] {
    return [
      this.srfProvider,
      this.swissinfoProvider,
    ];
  }
}