import { Injectable } from '@nestjs/common';
import Parser from 'rss-parser';

import {
  EvidenceProvider,
  EvidenceResult,
} from './provider.interface';

@Injectable()
export class SrfProvider implements EvidenceProvider {
  readonly name = 'SRF';

  private readonly parser = new Parser();

  private readonly rssUrl =
    'https://www.srf.ch/news/bnf/rss/1646';

  async search(query: string): Promise<EvidenceResult[]> {
    console.log(`🔎 ${this.name} RSS-Suche: ${query}`);

    try {
      const feed = await this.parser.parseURL(this.rssUrl);

      console.log(
        `📡 ${this.name}: ${feed.items.length} RSS-Artikel geladen`,
      );

      const keywords = this.extractKeywords(query);

      console.log(
        `🧠 ${this.name} Suchbegriffe: ${keywords.join(', ')}`,
      );

      const results = feed.items
        .filter((item) => {
          if (!item.title || !item.link) {
            return false;
          }

          const result = this.calculateRelevance(
            item.title,
            keywords,
          );

          console.log(
            `🎯 SRF Score ${result.score}: ${item.title}`,
          );

          return result.relevant;
        })
        .map((item): EvidenceResult => ({
          source: this.name,
          url: item.link!,
          headline: item.title!,
          summary:
            item.contentSnippet ??
            item.content ??
            '',
          publishedAt: item.pubDate
            ? new Date(item.pubDate)
            : undefined,
          credibility: 90,
        }));

      console.log(
        `✅ ${this.name}: ${results.length} relevante Artikel gefunden`,
      );

      return results;
    } catch (error) {
      console.error(
        `❌ ${this.name} RSS Fehler:`,
        error,
      );

      return [];
    }
  }

  private extractKeywords(query: string): string[] {
    const normalized = this.normalize(query);

    const stopWords = new Set([
      'der',
      'die',
      'das',
      'den',
      'dem',
      'des',
      'ein',
      'eine',
      'einer',
      'einem',
      'einen',
      'und',
      'oder',
      'aber',
      'als',
      'auch',
      'auf',
      'aus',
      'bei',
      'mit',
      'nach',
      'von',
      'für',
      'fuer',
      'fur',
      'im',
      'in',
      'ist',
      'sich',
      'man',
      'muss',
      'wird',
      'wie',
      'zu',
      'es',
      'durch',
      'über',
      'ueber',
      'vor',
      'an',
      'am',
      'zum',
      'zur',
    ]);

    return normalized
      .split(' ')
      .filter((word) => word.length >= 4)
      .filter((word) => !stopWords.has(word))
      .filter(
        (word, index, words) =>
          words.indexOf(word) === index,
      );
  }

  private calculateRelevance(
    title: string,
    keywords: string[],
  ): {
    score: number;
    relevant: boolean;
  } {
    const normalizedTitle = this.normalize(title);

    if (keywords.length === 0) {
      return {
        score: 0,
        relevant: false,
      };
    }

    const matches = keywords.filter((keyword) =>
      normalizedTitle.includes(keyword),
    );

    /*
     * Längere Begriffe sind meistens spezifischer.
     * Deshalb bekommen sie mehr Gewicht.
     */
    const score = matches.reduce(
      (total, keyword) => {
        if (keyword.length >= 8) {
          return total + 3;
        }

        if (keyword.length >= 6) {
          return total + 2;
        }

        return total + 1;
      },
      0,
    );

    /*
     * Zusätzlich prüfen wir, wie viele der
     * relevanten Begriffe tatsächlich vorkommen.
     */
    const matchRatio =
      matches.length / keywords.length;

    /*
     * Strengere Regeln:
     *
     * 1. Mindestens zwei Treffer
     * 2. Mindestens 40 % der Suchbegriffe
     *
     * ODER
     *
     * ein sehr spezifischer Begriff mit
     * mindestens 3 Score-Punkten.
     */
    const relevant =
      (matches.length >= 2 &&
        matchRatio >= 0.4) ||
      (matches.length === 1 && score >= 3);

    return {
      score,
      relevant,
    };
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
}