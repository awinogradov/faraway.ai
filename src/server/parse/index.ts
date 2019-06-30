import { URL } from 'url';

const strategiesMap = {
  instagram: (url: URL) => ({
    strategy: 'Instagram',
  }),
};

export function resolveParseStrategy(url: string) {
  const parsedUrl = new URL(url);

  if (parsedUrl.hostname.includes('instagram')) {
    return strategiesMap.instagram(parsedUrl);
  }

  return {
    strategy: 'UNIMPLEMENTED',
  };
}
