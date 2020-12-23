export default class QuestionGroup {
  id: string = '';
  name: string = '';

  clone = (): QuestionGroup => {
    return {...this};
  };
};
