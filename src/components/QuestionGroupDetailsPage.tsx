import React, {useState, useEffect} from 'react';

import {useRouteMatch} from 'react-router';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import QuestionGroupDetails from './QuestionGroupDetails';

import QuestionGroup from "../data/QuestionGroup";

import {getQuestionGroup, addQuestionGroup, updateQuestionGroup} from '../services/questionGroupsApi';

enum EditMode {
  EDIT,
  ADD,
  INVALID
};

type QuestionGroupDetailsPageProps = {
  editMode: EditMode,
  questionGroupId: string | null,
  onSaved: () => void
};

const QuestionGroupDetailsPage = (props: QuestionGroupDetailsPageProps) => {
  const {editMode, questionGroupId, onSaved} = props;

  const [questionGroup, setQuestionGroup] = useState(null as QuestionGroup | null);

  useEffect(() => {
    (async () => {
      switch (editMode) {
        case EditMode.ADD:
          const newQuestionGroup = new QuestionGroup();
          setQuestionGroup(newQuestionGroup);
          break;

        case EditMode.EDIT:
          if (!questionGroupId) {
            break;
          }

          const questionGroup = await getQuestionGroup(questionGroupId);
          setQuestionGroup(questionGroup);
          break;

        default:
          break;
      }
    })();
  }, [editMode, questionGroupId]);

  const onSetQuestionGroup = (newQuestionGroup: QuestionGroup) => {
    setQuestionGroup(newQuestionGroup);
  };

  const onSave = async () => {
    console.log('save', editMode);

    if (!questionGroup) {
      return;
    }

    let questionGroupId: string | null, updatedQuestionGroup: QuestionGroup | null;
    switch (editMode) {
      case EditMode.ADD:
        questionGroupId = await addQuestionGroup(questionGroup);
        if (questionGroupId !== null) {
          console.log('saved, refreshing');
          updatedQuestionGroup = await getQuestionGroup(questionGroupId);
          setQuestionGroup(updatedQuestionGroup);
          onSaved();
        }
        break;

      case EditMode.EDIT:
        questionGroupId = await updateQuestionGroup(questionGroup);
        if (questionGroupId !== null) {
          console.log('saved, refreshing');
          updatedQuestionGroup = await getQuestionGroup(questionGroupId);
          setQuestionGroup(updatedQuestionGroup);
          onSaved();
        }
        break;

      default:
        break;
    }
  };

  if (editMode === EditMode.INVALID || !questionGroup) {
    return (
      <Typography variant="h4" gutterBottom>Question Group Details</Typography>
    );
  }

  return (
    <Box padding="16px">
      <QuestionGroupDetails
        questionGroup={questionGroup}
        setQuestionGroup={onSetQuestionGroup}
        onSave={onSave} />
    </Box>
  );
};

const QuestionGroupDetailsPageFromRoute = () => {
  const {params} = useRouteMatch();
  const questionGroupIdFromParams: string = (params as any).questionGroupId;

  const [editMode, setEditMode] = useState(EditMode.INVALID);
  const [questionGroupId, setQuestionGroupId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (questionGroupIdFromParams === 'newQuestionGroup') {
        setEditMode(EditMode.ADD);
      } else {
        setEditMode(EditMode.EDIT);
        setQuestionGroupId(questionGroupIdFromParams);
      }
    })();
  }, [questionGroupIdFromParams]);

  return (
    <QuestionGroupDetailsPage
      editMode={editMode}
      questionGroupId={questionGroupId}
      onSaved={() => {}}
    />
  );
};

export default QuestionGroupDetailsPageFromRoute;
