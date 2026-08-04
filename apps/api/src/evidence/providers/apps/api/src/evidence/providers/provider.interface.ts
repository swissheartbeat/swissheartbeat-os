 export interface EvidenceResult {
  source: string;
  url: string;

  headline: string;
  summary?: string;

  publishedAt?: Date;

  credibility?: number;
}

export interface EvidenceProvider {
  search(query: string): Promise<EvidenceResult[]>;
}