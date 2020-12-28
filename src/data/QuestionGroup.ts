export default class QuestionGroup {
  id: string | null = null;
  name: string = '';

  clone = (): QuestionGroup => {
    return {...this};
  };
};
