import React, {useState, useEffect, useCallback} from 'react';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {useHistory} from 'react-router-dom';

import QuestionGroup from '../data/QuestionGroup';

import {getQuestionGroups} from '../services/questionGroupsApi';

type QuestionGroupsProps = {

};

const QuestionGroups = (props: QuestionGroupsProps) => {
  const [questionGroups, setQuestionGroups] = useState([] as QuestionGroup[]);

  const history = useHistory();

  const onQuestionClick = (questionGroupId: string | null) => {
    if (!questionGroupId) {
      return;
    }
    history.push(`/questionGroup/${questionGroupId}`);
  };

  const onNewQuestionGroupClick = useCallback(() => {
    history.push(`/questionGroup/newQuestionGroup`);
  }, [history]);

  useEffect(() => {
    getQuestionGroups()
        .then(res => {
          console.log('get question groups successful');
          setQuestionGroups(res);
        });
  }, []);

  return (
    <div>
      <List dense={true}>
        {questionGroups.map(questionGroup => (
          <ListItem key={questionGroup.id} onClick={() => onQuestionClick(questionGroup.id)} button>
            <ListItemText
              primary={questionGroup.name} />
          </ListItem>
        ))}
      </List>

      <Fab color="primary" aria-label="new question group" onClick={onNewQuestionGroupClick}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default QuestionGroups;
