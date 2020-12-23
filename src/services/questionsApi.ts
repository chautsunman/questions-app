import Question from '../data/Question';

import {SERVER_HOST} from './serverDetails';
import {ApiResult} from './ApiResult';

const apiPath = `${SERVER_HOST}/questions`;

export const getQuestions = async (groupId: string | null, id: string | null): Promise<Question[]> => {
  console.log('get questions');

  try {
    const urlParams = new URLSearchParams();
    if (groupId) {
      urlParams.append('groupId', groupId);
    }
    if (id) {
      urlParams.append('id', id);
    }
    const res = await fetch(`${apiPath}/questions?${urlParams.toString()}`);
    const {success, data} = (await res.json()) as ApiResult<Question[]>;

    if (!success) {
      throw new Error('get questions api successful, but not success');
    }

    console.log('get questions successful');
    return data.map((questionObj) => Object.assign(new Question(), questionObj));
  } catch (err) {
    console.log('get questions error', err);
    return [];
  }
};

export const getQuestion = async (id: string): Promise<Question | null> => {
  console.log('get question', id);
  const questions = await getQuestions(null, id);
  return (questions.length) ? questions[0] : null;
};

export const addQuestion = async (questionGroupId: string, question: Question): Promise<string | null> => {
  console.log('add question');

  const formData = {
    groupId: questionGroupId,
    question: question
  };

  try {
    const res = await fetch(`${apiPath}/addQuestion`, {
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
      throw new Error('add question api successful, but not added');
    }

    console.log('add question successful');
    return data;
  } catch (err) {
    console.log('add question error', err);
    return null;
  }
};

export const updateQuestion = async (questionGroupId: string, question: Question): Promise<string | null> => {
  console.log('update question');

  const formData = {
    groupId: questionGroupId,
    question: question
  };

  try {
    const res = await fetch(`${apiPath}/updateQuestion`, {
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
      throw new Error('update question api successful, but not added');
    }

    console.log('update question successful');
    return data;
  } catch (err) {
    console.log('update question error', err);
    return null;
  }
};

export const getRandomQuestion = async (groupId: string): Promise<Question | null> => {
  console.log('get random question');

  try {
    const urlParams = new URLSearchParams();
    urlParams.append('groupId', groupId);
    const res = await fetch(`${apiPath}/getRandomQuestion?${urlParams.toString()}`);
    const {success, data} = (await res.json()) as ApiResult<Question>;

    if (!success || data == null) {
      throw new Error('get random question api successful, but not success');
    }

    console.log('get random question successful');
    return data;
  } catch (err) {
    console.log('get random question error', err);
    return null;
  }
};
