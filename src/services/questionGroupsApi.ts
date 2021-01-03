import QuestionGroup from '../data/QuestionGroup';

import {getApi, postApi} from './api';
import {ApiResult} from './ApiResult';

const apiPath = '/api/questionGroups';

export const getQuestionGroups = async (id: string | null = null): Promise<QuestionGroup[]> => {
  console.log('get question groups');

  try {
    const urlParams = new URLSearchParams();
    if (id) {
      urlParams.append('id', id);
    }

    const res = await getApi(`${apiPath}/questionGroups`, urlParams, {});
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

export const getQuestionGroup = async (id: string): Promise<QuestionGroup | null> => {
  console.log('get question group', id);
  const questionGroups = await getQuestionGroups(id);
  return (questionGroups.length) ? questionGroups[0] : null;
};

export const addQuestionGroup = async (questionGroup: QuestionGroup): Promise<string | null> => {
  console.log('add question group');

  const formData = {
    questionGroup: questionGroup
  };

  try {
    const res = await postApi(`${apiPath}/addQuestionGroup`, formData, {});
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

export const updateQuestionGroup = async (questionGroup: QuestionGroup): Promise<string | null> => {
  console.log('update question group');

  const formData = {
    questionGroup: questionGroup
  };

  try {
    const res = await postApi(`${apiPath}/updateQuestionGroup`, formData, {});
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
