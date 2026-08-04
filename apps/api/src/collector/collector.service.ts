import { Injectable } from '@nestjs/common';
import { RssCollector } from './rss/rss.collector';
import { SignalService } from '../signal/signal.service';

@Injectable()
export class CollectorService {
  constructor(
    private readonly rssCollector: RssCollector,
    private readonly signalService: SignalService,
  ) {}

  async collect() {
    const result = await this.rssCollector.collect();

    let imported = 0;

    for (const feed of result.feeds) {
      for (const article of feed.articles) {
        if (!article.title || !article.link) {
          continue;
        }

        const saved = await this.signalService.importFromRss({
          title: article.title,
          link: article.link,
          source: feed.collector,
          language: feed.language,
          category: feed.category,
          pubDate: article.pubDate,
        });

        if (saved.created) {
          imported++;
        }
      }
    }

    return {
      ...result,
      imported,
    };
  }
}