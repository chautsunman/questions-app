import {SERVER_HOST} from './serverDetails';
import {ApiResult} from './ApiResult';

const apiPath = `${SERVER_HOST}/auth`;

type SignInResData = {
  signedIn: boolean
};

export const signIn = async (uid: string) => {
  console.log('sign in');

  const formData = {
    uid: uid
  };

  try {
    const res = await fetch(`${apiPath}/signIn`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(formData)
    });
    const {success, data} = (await res.json()) as ApiResult<SignInResData>;

    if (!success) {
      throw new Error('sign in api successful, but success is false');
    }

    console.log('sign in api successful', data.signedIn);
    return data.signedIn;
  } catch (err) {
    console.log('sign in error', err);
    return false;
  }
};
