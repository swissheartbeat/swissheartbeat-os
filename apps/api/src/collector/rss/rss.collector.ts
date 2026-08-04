import { Injectable } from '@nestjs/common';
import Parser from 'rss-parser';

import { SWISS_FEEDS } from '../feeds/swiss.feeds';

@Injectable()
export class RssCollector {
  private parser = new Parser();

  async collect() {
    const results: any[] = [];

    for (const feed of SWISS_FEEDS) {
      try {
        const rss = await this.parser.parseURL(feed.url);

        results.push({
          collector: feed.name,
          language: feed.language,
          category: feed.category,

          title: rss.title,
          articleCount: rss.items.length,

          articles: rss.items.map((item) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
          })),
        });

        console.log(`✅ ${feed.name}: ${rss.items.length} Artikel`);
      } catch (error: any) {
        console.error(
          `❌ ${feed.name}: ${error.message ?? 'Unbekannter Fehler'}`,
        );

        continue;
      }
    }

    return {
      status: 'ok',
      feeds: results,
    };
  }
}