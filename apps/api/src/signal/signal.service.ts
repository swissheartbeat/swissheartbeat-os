import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { HeartbeatScorer } from './heartbeat.scorer';

@Injectable()
export class SignalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly heartbeatScorer: HeartbeatScorer,
  ) {}

  async importFromRss(article: {
    title: string;
    link: string;
    source: string;
    language: string;
    category: string;
    pubDate?: string;
  }) {
    const existing = await this.prisma.signal.findFirst({
      where: {
        url: article.link,
      },
    });

    if (existing) {
      return {
        signal: existing,
        created: false,
      };
    }

    const heartbeat = this.heartbeatScorer.calculate({
      source: article.source,
      category: article.category,
      publishedAt: article.pubDate
        ? new Date(article.pubDate)
        : undefined,
    });

    const signal = await this.prisma.signal.create({
      data: {
        title: article.title,
        description: '',
        source: article.source,
        url: article.link,

        language: article.language,
        category: article.category,

        publishedAt: article.pubDate
          ? new Date(article.pubDate)
          : null,

        score: heartbeat.score,
        priority: heartbeat.priority,
      },
    });

    return {
      signal,
      created: true,
    };
  }

  async findAll() {
    return this.prisma.signal.findMany({
      orderBy: {
        priority: 'desc',
      },
    });
  }
}