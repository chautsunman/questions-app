import {getApi} from './api';
import {ApiResult} from './ApiResult';

import User from '../data/User';

const apiPath = '/api/user';

export const searchUser = async (searchStr: string): Promise<User | null> => {
  console.log('search user', searchStr);

  const urlParams = new URLSearchParams();
  urlParams.append('searchStr', searchStr);

  try {
    const res = await getApi(`${apiPath}/searchUser`, urlParams, {});
    const {success, data} = (await res.json()) as ApiResult<User | null>;

    if (!success) {
      throw new Error('search user api successful, but success is false');
    }

    console.log('search user api successful');
    return data;
  } catch (err) {
    console.log('search user error', err);
    return null;
  }
};
