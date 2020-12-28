export default class Question {
  id: string | null = null;
  question: string = '';

  clone = (): Question => {
    return {...this};
  };
};
