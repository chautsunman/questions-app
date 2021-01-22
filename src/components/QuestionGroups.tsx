import React, {useState, useEffect, useCallback} from 'react';

import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

import {useHistory} from 'react-router-dom';

import QuestionGroup from '../data/QuestionGroup';

import {getQuestionGroups} from '../services/questionGroupsApi';

const useStyles = makeStyles({
  addFab: {
    position: 'absolute',
    bottom: 16,
    right: 16
  }
});

type QuestionGroupsProps = {

};

const QuestionGroups = (props: QuestionGroupsProps) => {
  const [questionGroups, setQuestionGroups] = useState([] as QuestionGroup[]);

  const classes = useStyles();

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
    <Box height="100%" width="100%" padding="16px" position="relative">
      <List dense={true}>
        {questionGroups.map(questionGroup => (
          <ListItem key={questionGroup.id} onClick={() => onQuestionClick(questionGroup.id)} button>
            <ListItemText
              primary={questionGroup.name} />
          </ListItem>
        ))}
      </List>

      <Fab
        color="primary"
        aria-label="new question group"
        onClick={onNewQuestionGroupClick}
        className={classes.addFab}>
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default QuestionGroups;
