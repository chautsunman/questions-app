import React, {useState, useEffect} from 'react';

import Typography from '@material-ui/core/Typography';

import {useLocation, useHistory} from 'react-router-dom';

import QuestionDetails from './QuestionDetails';

import Question from "../data/Question";

import {getQuestion, addQuestion, updateQuestion, getRandomQuestion} from '../services/questionsApi';

type QuestionDetailsPageProps = {

};

enum EditMode {
  EDIT,
  ADD,
  INVALID
};

const QuestionDetailsPage = (props: QuestionDetailsPageProps) => {
  const [editMode, setEditMode] = useState(EditMode.INVALID);
  const [question, setQuestion] = useState(null as Question | null);

  const location = useLocation();
  const pathname = location.pathname;
  const urlParams = new URLSearchParams(location.search);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      console.log('test', pathname, urlParams.get('id'));

      const pathnameSplit = pathname.split('/');
      if (pathnameSplit.length === 2 && urlParams.get('id')) {
        const questionId = urlParams.get('id');

        if (questionId !== null) {
          setEditMode(EditMode.EDIT);
          const question = await getQuestion(questionId);
          setQuestion(question);
          return;
        }
        
      } else if (pathnameSplit.length === 3) {
        if (pathnameSplit[2] === 'newQuestion') {
          setEditMode(EditMode.ADD);
          setQuestion(new Question());
          return;

        } else if (pathnameSplit[2] === 'randomQuestion') {
          setEditMode(EditMode.EDIT);
          const randomQuestion = await getRandomQuestion();
          if (randomQuestion !== null) {
            history.replace(`/question?id=${randomQuestion.id}`);
          }
          return;

        }
      }

      setEditMode(EditMode.INVALID);
    })();
  }, [pathname, urlParams.get('id'), history]);

  const onSetQuestion = (newQuestion: Question) => {
    setQuestion(newQuestion);
  };

  const onSave = async () => {
    console.log('save', editMode);

    if (!question) {
      return;
    }

    let questionId: string | null, updatedQuestion: Question | null;
    switch (editMode) {
      case EditMode.ADD:
        questionId = await addQuestion(question);
        if (questionId !== null) {
          console.log('saved, refreshing');
          history.push(`/question?id=${questionId}`);
        }
        break;
      
      case EditMode.EDIT:
        questionId = await updateQuestion(question);
        if (questionId !== null) {
          console.log('saved, refreshing');
          updatedQuestion = await getQuestion(questionId);
          setQuestion(updatedQuestion);
        }
        break;
      
      default:
        break;
    }
  };

  if (editMode === EditMode.INVALID || !question) {
    return (
      <Typography variant="h4" gutterBottom>Question Details</Typography>
    );
  }
  
  return (
    <QuestionDetails
      question={question}
      setQuestion={onSetQuestion}
      onSave={onSave} />
  );
};

export default QuestionDetailsPage;
