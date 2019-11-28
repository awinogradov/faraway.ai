/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import got from 'got';

const dataRegExp = /window\._sharedData\s?=\s?({.+);<\/script>/;

export interface InstagramProps {
  post?: string;
}

interface ScrapProps {
  html: string;
  url: string;
}

const mapPropsToScrappers = {
  post,
};

export async function scrapInstagram(props: InstagramProps) {
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

function post({ html }: ScrapProps) {
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

// interface InstagramLocationEdgeData {
//   node: {
//     display_url: string;
//     shortcode: string;
//     is_video: boolean;
//     edge_liked_by: {
//       count: number;
//     };
//   };
// }

// interface InstagramLocationData {
//   entry_data: {
//     LocationsPage: Array<{
//       graphql: {
//         location: {
//           id: string;
//           name: string;
//           lat: number;
//           lng: number;
//           website: string;
//           edge_location_to_media: {
//             count: number;
//             edges: Array<InstagramLocationEdgeData>;
//           };
//           edge_location_to_top_posts: {
//             count: number;
//             edges: Array<InstagramLocationEdgeData>;
//           };
//         };
//       };
//     }>;
//   };
// }

// async function location({ url }: ScrapProps) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto(url, {
//     waitUntil: 'networkidle0',
//   });

//   const data: InstagramLocationData = await page.evaluate(function() {
//     // @ts-ignore
//     return window._sharedData;
//   });

// const data = parseJsonData<InstagramLocationData>(html);
// eslint-disable-next-line no-shadow
// const { location } = data.entry_data.LocationsPage[0].graphql;

// @ts-ignore
// return data;

// return {
//   name: location.name,
//   ref: `https://www.instagram.com/explore/locations/${location.id}/`,
//   lat: location.lat,
//   lng: location.lng,
//   website: location.website,
//   top: location.edge_location_to_top_posts.edges.map(edge => ({
//     ref: `https://www.instagram.com/p/${edge.node.shortcode}`,
//     src: edge.node.display_url,
//     isVideo: edge.node.is_video,
//   })),
//   recent: location.edge_location_to_media.edges.map(edge => ({
//     ref: `https://www.instagram.com/p/${edge.node.shortcode}`,
//     src: edge.node.display_url,
//     isVideo: edge.node.is_video,
//   })),
// };
// }
