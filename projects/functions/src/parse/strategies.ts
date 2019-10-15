import { URL } from 'url';
import got from 'got';
import { createClient } from '@google/maps';

const googleMapsClient = createClient({
    key: 'AIzaSyCdOCj0doOo5--OVejnyliXbtZ-hgRnq5A',
    Promise: Promise
});

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

const instagramData = require('./instagram')();

interface StrategyInstagramData {
  strategy?: 'instagram';
  post?: {
    image?: string;
    ref?: string;
    likes?: number;
  };
  author?: {
    username: string;
    avatar: string;
    ref: string;
  };
  location?: {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    googleMapsUrl: string;
    ref: string;
  }
}

export async function instagram(url: URL): Promise<StrategyInstagramData> {
  const scraper = require('metascraper')([
    ...openGraphData,
    instagramData,
  ]);
  const { body } = await got(url.href);
  const meta = await scraper({ html: body, url: url.href });
  const instaParsed = meta.instagram;
  const geoRes = await googleMapsClient.geocode({ address: instaParsed.location.name }).asPromise();
  const placePos = geoRes.json.results[0];

  const infoRes = await googleMapsClient.place({ placeid: placePos.place_id }).asPromise();
  const placeInfo = infoRes.json.result;

  // TODO:
  // 1. get tags from address_components
  // 2. add kind of objects: place, document and etc.

  const result: StrategyInstagramData = {
    strategy: 'instagram',
    post: {
      image: instaParsed.image || meta.image,
      ref: url.href,
      likes: instaParsed.likes,
    },
    author: {
      username: instaParsed.owner.username,
      avatar: instaParsed.owner.avatar,
      ref: `https://www.instagram.com/${instaParsed.owner.username}/`,
    },
    location: {
      id: instaParsed.location.id,
      name: instaParsed.location.name,
      address: placePos.formatted_address,
      lat: placePos.geometry.location.lat,
      lng: placePos.geometry.location.lng,
      googleMapsUrl: placeInfo.url,
      ref: `https://www.instagram.com/explore/locations/${instaParsed.location.id}/`
    }
  };

  return result;
}
