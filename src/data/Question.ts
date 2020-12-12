export default class Question {
  id: string = '';
  question: string = '';

  clone = (): Question => {
    return {...this};
  };
};
