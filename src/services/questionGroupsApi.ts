import QuestionGroup from '../data/QuestionGroup';

import {SERVER_HOST} from './serverDetails';
import {ApiResult} from './ApiResult';

const apiPath = `${SERVER_HOST}/questionGroups`;

export const getQuestionGroups = async (uid: string, id: string | null = null): Promise<QuestionGroup[]> => {
  console.log('get question groups');

  try {
    const urlParams = new URLSearchParams();
    urlParams.append('uid', uid);
    if (id) {
      urlParams.append('id', id);
    }

    const res = await fetch(`${apiPath}/questionGroups?${urlParams.toString()}`);
    const {success, data} = (await res.json()) as ApiResult<QuestionGroup[]>;

    if (!success) {
      throw new Error('get question groups api successful, but not success');
    }

    console.log('get question groups successful');
    return data.map((questionGroupObj) => Object.assign(new QuestionGroup(), questionGroupObj));
  } catch (err) {
    console.log('get question groups error', err);
    return [];
  }
};

export const getQuestionGroup = async (uid: string, id: string): Promise<QuestionGroup | null> => {
  console.log('get question group', id);
  const questionGroups = await getQuestionGroups(uid, id);
  return (questionGroups.length) ? questionGroups[0] : null;
};

export const addQuestionGroup = async (uid: string, questionGroup: QuestionGroup): Promise<string | null> => {
  console.log('add question group');

  const formData = {
    uid: uid,
    questionGroup: questionGroup
  };

  try {
    const res = await fetch(`${apiPath}/addQuestionGroup`, {
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
    const {success, data} = (await res.json()) as ApiResult<string | null>;

    if (!success || data === null) {
      throw new Error('add question group api successful, but not added');
    }

    console.log('add question group successful');
    return data;
  } catch (err) {
    console.log('add question group error', err);
    return null;
  }
};

export const updateQuestionGroup = async (uid: string, questionGroup: QuestionGroup): Promise<string | null> => {
  console.log('update question group');

  const formData = {
    uid: uid,
    questionGroup: questionGroup
  };

  try {
    const res = await fetch(`${apiPath}/updateQuestionGroup`, {
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
    const {success, data} = (await res.json()) as ApiResult<string | null>;

    if (!success || data === null) {
      throw new Error('update question group api successful, but not added');
    }

    console.log('update question group successful');
    return data;
  } catch (err) {
    console.log('update question group error', err);
    return null;
  }
};
