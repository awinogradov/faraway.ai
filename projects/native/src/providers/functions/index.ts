import { firebase } from '@react-native-firebase/functions';
import { InstagramProps, InstagramScrapedPost } from 'faraway.ai-functions';

type FunctionCall<P, R = void> = (props: P) => Promise<{ data: R }>;

function provideFunction<P, R>(name: string): FunctionCall<P, R> {
  return async (props: P) => {
    let res;
    try {
      res = await firebase.functions().httpsCallable(name)(props);
    } catch (err) {
      console.error(err);
    }

    return res && res.data ? res.data : null;
  };
}

export const scrapInstagram = provideFunction<InstagramProps, InstagramScrapedPost>('scrapInstagram');
