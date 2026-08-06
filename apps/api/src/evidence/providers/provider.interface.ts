export interface EvidenceResult {
  source: string;
  url: string;

  headline: string;
  summary?: string;

  publishedAt?: Date;

  credibility?: number;
}

export interface EvidenceProvider {
  /**
   * Anzeigename des Providers
   */
  readonly name: string;

  /**
   * Sucht nach Evidence
   */
  search(query: string): Promise<EvidenceResult[]>;
}