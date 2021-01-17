export default class Question {
  id: string | null = null;
  question: string = '';
  details: string = '';

  clone = (): Question => {
    return Object.assign(new Question(), {...this});
  };
};
