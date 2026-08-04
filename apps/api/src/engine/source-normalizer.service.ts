import { Injectable } from '@nestjs/common';

@Injectable()
export class SourceNormalizerService {
  normalize(source: string): string {
    const value = source.toLowerCase();

    if (value.includes('reuters')) {
      return 'Reuters';
    }

    if (value.includes('srf')) {
      return 'SRF';
    }

    if (value.includes('swissinfo')) {
      return 'Swissinfo';
    }

    if (value.includes('bbc')) {
      return 'BBC';
    }

    if (value.includes('nzz')) {
      return 'NZZ';
    }

    return 'Unknown';
  }
}