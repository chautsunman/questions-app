import React, {useCallback} from 'react';

import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

import {useRouteMatch, useHistory} from "react-router-dom";

import Questions from './Questions';

const useStyles = makeStyles({
  addFab: {
    position: 'absolute',
    bottom: 16,
    right: 16
  }
});

type QuestionsPageProps = {
  questionGroupId: string
};

const QuestionsPage = (props: QuestionsPageProps) => {
  const {questionGroupId} = props;

  const classes = useStyles();

  const history = useHistory();

  const onNewQuestionClick = useCallback(() => {
    history.push(`/question/${questionGroupId}/newQuestion`);
  }, [questionGroupId, history]);

  const onPickQuestionClick = useCallback(async () => {
    console.log('Pick a random question');
    history.push(`/question/${questionGroupId}/randomQuestion?id=${new Date().getTime()}`);
  }, [questionGroupId, history]);

  return (
    <Box height="100%" width="100%" padding="16px" position="relative">
      <Button variant="contained" color="secondary" onClick={onPickQuestionClick}>
        Pick a random question
      </Button>

      <Fab
        color="primary"
        aria-label="new question"
        onClick={onNewQuestionClick}
        className={classes.addFab}>
        <AddIcon />
      </Fab>

      <Questions
        questionGroupId={questionGroupId} />
    </Box>
  );
};

const QuestionsPageFromRoute = () => {
  const questionMatch = useRouteMatch({
    path: '/question/:questionGroupId/:questionId'
  });
  const questionGroupMatch = useRouteMatch({
    path: '/questionGroup/:questionGroupId'
  });
  let questionGroupId: string | null = null;
  if (questionMatch) {
    questionGroupId = (questionMatch.params as any).questionGroupId;
  } else if (questionGroupMatch) {
    questionGroupId = (questionGroupMatch.params as any).questionGroupId;
  }

  if (!questionGroupId) {
    return null;
  }

  if (questionGroupId === 'newQuestionGroup') {
    return null;
  }

  return (
    <QuestionsPage
      questionGroupId={questionGroupId} />
  );
};

export default QuestionsPageFromRoute;
