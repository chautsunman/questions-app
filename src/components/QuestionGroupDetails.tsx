import React, {useState, useCallback} from 'react';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import MsgDialog from './MsgDialog';

import {searchUser} from '../services/userApi';

import QuestionGroup from '../data/QuestionGroup';

type QuestionGroupDetailsProps = {
  questionGroup: QuestionGroup,
  setQuestionGroup: (newQuestion: QuestionGroup) => void,
  onSave: () => Promise<void>
};

const QuestionGroupDetails = (props: QuestionGroupDetailsProps) => {
  const {questionGroup, setQuestionGroup, onSave} = props;

  const [addNewMemberEmail, setAddNewMemberEmail] = useState('');
  const [msgDialogOpen, setMsgDialogOpen] = useState(false);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuestionGroup = questionGroup.clone();
    newQuestionGroup.name = event.target.value;
    setQuestionGroup(newQuestionGroup);
  };

  const onAddNewMemberEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddNewMemberEmail(event.target.value);
  };

  const onAddMember = useCallback(async () => {
    const user = await searchUser(addNewMemberEmail);

    if (user === null) {
      setMsgDialogOpen(true);
      return;
    }

    let newQuestionGroup = questionGroup.clone();
    newQuestionGroup.addMember(user);
    setQuestionGroup(newQuestionGroup);
    setAddNewMemberEmail('');
  }, [questionGroup, addNewMemberEmail, setQuestionGroup, setAddNewMemberEmail, setMsgDialogOpen]);

  const onRemoveMember = useCallback((uid: string) => {
    let newQuestionGroup = questionGroup.clone();
    newQuestionGroup.removeMember(uid);
    setQuestionGroup(newQuestionGroup);
  }, [questionGroup, setQuestionGroup]);

  const onMsgDialogClose = useCallback(() => {
    setMsgDialogOpen(false);
  }, [setMsgDialogOpen]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>{questionGroup.name}</Typography>

      <TextField
        label="Question"
        value={questionGroup.name}
        onChange={onNameChange}
        fullWidth
      />

      <Typography variant="h5" gutterBottom>Members</Typography>
      <List>
        {questionGroup.members.map(user => (
          <ListItem key={user.uid}>
            <ListItemText primary={user.email} />
            {
              !questionGroup.isOwner(user)
              && (
                <ListItemSecondaryAction onClick={() => user.uid != null && onRemoveMember(user.uid)}>
                  <IconButton edge="end" aria-label="remove member">
                    <ClearIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )
            }
            {
              questionGroup.isOwner(user)
              && (
                <ListItemSecondaryAction onClick={() => user.uid != null && onRemoveMember(user.uid)}>Owner</ListItemSecondaryAction>
              )
            }
          </ListItem>
        ))}
        <ListItem>
          <TextField
            label="New member"
            value={addNewMemberEmail}
            onChange={onAddNewMemberEmailChange}
            fullWidth
          />
          <ListItemSecondaryAction onClick={onAddMember}>
            <IconButton edge="end" aria-label="add member">
              <AddIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Button variant="contained" color="secondary" onClick={onSave}>
        Save
      </Button>

      <MsgDialog
        open={msgDialogOpen}
        onClose={onMsgDialogClose}
        title="Cannot add member"
        msg="Member email is invalid."
        closeText="Ok" />
    </div>
  );
};

export default QuestionGroupDetails;
