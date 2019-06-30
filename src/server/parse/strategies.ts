import { URL } from 'url';
import got from 'got';

const openGraphData = [
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
];

export async function instagram(url: URL) {
  const scraper = require('metascraper')([
    ...openGraphData
  ]);
  const { body } = await got(url.href);
  const metadata = await scraper({ html: body, url: url.href });

  return {
    strategy: 'instagram',
    ...metadata
  };
}
