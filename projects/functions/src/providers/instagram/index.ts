/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import { https } from 'firebase-functions';
import got from 'got';

export type InstagramProps = Record<keyof typeof mapPropsToScrappers, string>;

interface ScrapProps {
  html: string;
  url: string;
}

export interface InstagramPostData {
  entry_data: {
    PostPage: Array<{
      graphql: {
        shortcode_media: {
          location?: {
            id: string;
            name: string;
            address_json: string;
          };
          display_url: string;
          shortcode: string;
          is_video: boolean;
          owner: {
            id: string;
            username: string;
            full_name: string;
            profile_pic_url: string;
            is_private: boolean;
            is_verified: boolean;
          };
          edge_media_preview_like: {
            count: number;
          };
        };
      };
    }>;
  };
}

export interface InstagramScrapedPost {
  ref: string;
  src: string;
  isVideo: boolean;
  owner: {
    ref: string;
    username: string;
    fullName: string;
    avatar: string;
    private: boolean;
    verified: boolean;
  };
  location?: {
    id: string;
    name: string;
    region: string;
    ref: string;
  };
}

const mapPropsToScrappers = {
  post,
};

const dataRegExp = /window\._sharedData\s?=\s?({.+);<\/script>/;

async function resolveInstagramContent(props: InstagramProps) {
  const scrapKind = Object.keys(props)[0] as keyof InstagramProps;
  const url = props[scrapKind];

  if (!url) {
    throw new Error('Unsupported instagram data kind for scrapping.');
  }

  const { body: html } = await got(url);

  return mapPropsToScrappers[scrapKind]({ html, url });
}

function parseJsonData<T>(html: string) {
  let data: T;

  try {
    const matched = html.match(dataRegExp);
    const dataString = matched![1];
    data = JSON.parse(dataString);
  } catch (e) {
    throw new Error('The HTML returned from instagram was not suitable for scraping');
  }

  return data;
}

function post({ html }: ScrapProps): InstagramScrapedPost {
  const data = parseJsonData<InstagramPostData>(html);
  const { shortcode_media } = data.entry_data.PostPage[0].graphql;

  return {
    ref: `https://www.instagram.com/p/${shortcode_media.shortcode}`,
    src: shortcode_media.display_url,
    isVideo: shortcode_media.is_video,
    owner: {
      ref: `https://www.instagram.com/${shortcode_media.owner.username}`,
      username: shortcode_media.owner.username,
      fullName: shortcode_media.owner.full_name,
      avatar: shortcode_media.owner.profile_pic_url,
      private: shortcode_media.owner.is_private,
      verified: shortcode_media.owner.is_verified,
    },
    location: shortcode_media.location
      ? {
          id: shortcode_media.location.id,
          name: shortcode_media.location.name,
          region: JSON.parse(shortcode_media.location.address_json).country_code,
          ref: `https://www.instagram.com/explore/locations/${shortcode_media.location.id}/`,
        }
      : undefined,
  };
}

export const scrapInstagram = https.onCall(resolveInstagramContent);
