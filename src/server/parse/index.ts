import { URL } from 'url';

import * as strategies from './strategies';

export function resolveParseStrategy(url: string) {
  const parsedUrl = new URL(url);

  if (parsedUrl.hostname.includes('instagram')) {
    return strategies.instagram(parsedUrl);
  }

  return {
    strategy: 'UNIMPLEMENTED',
  };
}
