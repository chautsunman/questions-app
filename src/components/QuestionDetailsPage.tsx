import React, {useState, useEffect} from 'react';

import {useRouteMatch} from 'react-router';
import {useHistory} from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import QuestionDetails from './QuestionDetails';

import Question from "../data/Question";

import {getQuestion, addQuestion, updateQuestion, getRandomQuestion} from '../services/questionsApi';

enum EditMode {
  EDIT,
  ADD,
  INVALID
};

type QuestionDetailsPageProps = {
  editMode: EditMode,
  questionGroupId: string,
  questionId: string | null,
  onSaved: () => void
};

const QuestionDetailsPage = (props: QuestionDetailsPageProps) => {
  const {editMode, questionGroupId, questionId, onSaved} = props;

  const [question, setQuestion] = useState(null as Question | null);
  const [uploadPhotos, setUploadPhotos] = useState(null as FileList | null);

  useEffect(() => {
    (async () => {
      switch (editMode) {
        case EditMode.ADD:
          setQuestion(new Question());
          break;

        case EditMode.EDIT:
          if (!questionId) {
            break;
          }

          const question = await getQuestion(questionGroupId, questionId);
          setQuestion(question);
          break;

        default:
          break;
      }
    })();
  }, [editMode, questionGroupId, questionId]);

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
        questionId = await addQuestion(questionGroupId, question, uploadPhotos);
        if (questionId !== null) {
          console.log('saved, refreshing');
          updatedQuestion = await getQuestion(questionGroupId, questionId);
          setQuestion(updatedQuestion);
        }
        break;

      case EditMode.EDIT:
        questionId = await updateQuestion(questionGroupId, question, uploadPhotos);
        if (questionId !== null) {
          console.log('saved, refreshing');
          updatedQuestion = await getQuestion(questionGroupId, questionId);
          setQuestion(updatedQuestion);
        }
        break;

      default:
        break;
    }

    setUploadPhotos(null);

    onSaved();
  };

  if (editMode === EditMode.INVALID || !question) {
    return (
      <Typography variant="h4" gutterBottom>Question Details</Typography>
    );
  }

  return (
    <Box padding="16px">
      <QuestionDetails
        question={question}
        setQuestion={onSetQuestion}
        setUploadPhotos={setUploadPhotos}
        onSave={onSave} />
    </Box>
  );
};

const QuestionDetailsPageFromRoute = () => {
  const {params} = useRouteMatch();
  const history = useHistory();
  const questionGroupId: string = (params as any).questionGroupId;
  const questionIdFromParams: string = (params as any).questionId;

  const [editMode, setEditMode] = useState(EditMode.INVALID);
  const [questionId, setQuestionId] = useState<string | null>(null);

  useEffect(() => {
    setEditMode(EditMode.INVALID);
    (async () => {
      if (questionIdFromParams === 'newQuestion') {
        setEditMode(EditMode.ADD);
      } else if (questionIdFromParams === 'randomQuestion') {
        const randomQuestion = await getRandomQuestion(questionGroupId);
        if (randomQuestion !== null) {
          history.replace(`/question/${questionGroupId}/${randomQuestion.id}`);
        }
      } else {
        setEditMode(EditMode.EDIT);
        setQuestionId(questionIdFromParams);
      }
    })();
  }, [questionIdFromParams, questionGroupId, history]);

  if (editMode === EditMode.INVALID) {
    return (
      <div>Loading</div>
    );
  }

  return (
    <QuestionDetailsPage
      editMode={editMode}
      questionGroupId={questionGroupId}
      questionId={questionId}
      onSaved={() => {}}
    />
  );
};

export default QuestionDetailsPageFromRoute;
