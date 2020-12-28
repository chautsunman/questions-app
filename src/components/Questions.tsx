import React, {useState, useEffect} from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {useHistory} from 'react-router-dom';

import Question from '../data/Question';

import {getQuestions} from '../services/questionsApi';

type QuestionsProps = {
  questionGroupId: string
};

const Questions = (props: QuestionsProps) => {
  const {questionGroupId} = props;

  const [questions, setQuestions] = useState([] as Question[]);

  const history = useHistory();

  useEffect(() => {
    getQuestions(questionGroupId, null)
        .then(res => {
          console.log('get questions successful');
          setQuestions(res);
        });
  }, [questionGroupId]);

  const onQuestionClick = (questionId: string | null) => {
    if (!questionId) {
      return;
    }
    history.push(`/question/${questionGroupId}/${questionId}`);
  };

  return (
    <div>
      <List dense={true}>
        {questions.map(question => (
          <ListItem key={question.id} onClick={() => onQuestionClick(question.id)} button>
            <ListItemText
              primary={question.question} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Questions;
