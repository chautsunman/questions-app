import React, {useCallback} from 'react';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import {useRouteMatch, useHistory} from "react-router-dom";

import Questions from './Questions';

type QuestionsPageProps = {
  questionGroupId: string
};

const QuestionsPage = (props: QuestionsPageProps) => {
  const {questionGroupId} = props;

  const history = useHistory();

  const onNewQuestionClick = useCallback(() => {
    history.push(`/question/${questionGroupId}/newQuestion`);
  }, [questionGroupId, history]);

  const onPickQuestionClick = useCallback(async () => {
    console.log('Pick a random question');
    history.push(`/question/${questionGroupId}/randomQuestion?id=${new Date().getTime()}`);
  }, [questionGroupId, history]);

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={onPickQuestionClick}>
        Pick a random question
      </Button>

      <Fab color="primary" aria-label="new question" onClick={onNewQuestionClick}>
        <AddIcon />
      </Fab>

      <Questions
        questionGroupId={questionGroupId} />
    </div>
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
