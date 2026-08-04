export interface FeedDefinition {
  name: string;
  url: string;
  category: string;
  language: string;
}

export const SWISS_FEEDS: FeedDefinition[] = [
  {
    name: 'SRF',
    url: 'https://www.srf.ch/news/bnf/rss/1646',
    category: 'News',
    language: 'de',
  },
  {
    name: 'Swissinfo',
    url: 'https://www.swissinfo.ch/eng/feed',
    category: 'News',
    language: 'en',
  },
  {
    name: 'NZZ',
    url: 'https://www.nzz.ch/startseite.rss',
    category: 'News',
    language: 'de',
  },
];