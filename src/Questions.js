import React, {useState, useEffect} from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {getQuestions} from './questionsApi';

const Questions = (props) => {
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    getQuestions()
        .then(res => {
          console.log('get questions successful');
          setQuestions(res);
        });
  }, []);
  
  return (
    <div>
      <List dense={true}>
        {questions.map(question => (
          <ListItem key={question.id}>
            <ListItemText
              primary={question.question} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Questions;
