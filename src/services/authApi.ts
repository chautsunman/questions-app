import {postApi} from './api';
import {ApiResult} from './ApiResult';

const apiPath = '/api/auth';

type SignInResData = {
  signedIn: boolean
};

export const signIn = async () => {
  console.log('sign in');

  try {
    const res = await postApi(`${apiPath}/signIn`, {}, {});
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
