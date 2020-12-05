import {SERVER_HOST} from './serverDetails';

const apiPath = `${SERVER_HOST}/questions`;

export const getQuestions = async () => {
  console.log('get questions');

  try {
    const res = await fetch(`${apiPath}/questions`);
    const resJson = await res.json();

    if (!resJson.success) {
      throw new Error('get question api successful, but not success');
    }
    
    console.log('get questions successful');
    return resJson.data;
  } catch (err) {
    console.log('get questions error', err);
    return [];
  }
};

export const addQuestion = async (question) => {
  console.log('add question');

  const data = {
    question: {
      question: question
    }
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
      body: JSON.stringify(data)
    });
    const resJson = res.json();

    if (!resJson.success) {
      throw new Error('add question api successful, but not added');
    }

    return true;
  } catch (err) {
    console.log('add question error', err);
    return false;
  }
};
