import {SERVER_HOST} from './serverDetails';

const apiPath = `${SERVER_HOST}/questions`;

export const getQuestions = () => {
  console.log('get questions');
  return fetch(`${apiPath}/getQuestions`)
      .then(res => res.json())
      .then(res => {
        console.log('get questions successful');
        return res;
      })
      .catch(err => {
        console.log('get questions error', err);
        return [];
      });
};
