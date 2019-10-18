import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';

export function createGglSignin(errorResolver: (e: Error) => void) {
  return async () => {
    try {
      await GoogleSignin.configure();

      const userData = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(userData.idToken);

      await auth()
        .signInWithCredential(credential)
        .catch(errorResolver);
    } catch (e) {
      errorResolver(e);
    }
  };
}

export function createFbSignin(errorResolver: (e: Error) => void) {
  return async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw new Error('User cancelled request');
      }

      // console.log('Login success with permissions', result.grantedPermissions);

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining the users access token');
      }

      const credential = await auth.FacebookAuthProvider.credential(data.accessToken);

      await auth()
        .signInWithCredential(credential)
        .catch(errorResolver);
    } catch (e) {
      errorResolver(e);
    }
  };
}

export async function signOut() {
  await auth().signOut();
}
