import {cloneDeep} from 'lodash';

export default class Question {
  id: string | null = null;
  question: string = '';
  details: string = '';

  clone(): Question {
    return cloneDeep(this);
  };
};
