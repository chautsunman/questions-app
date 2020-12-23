import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import QuestionGroup from '../data/QuestionGroup';

type QuestionGroupDetailsProps = {
  questionGroup: QuestionGroup,
  setQuestionGroup: (newQuestion: QuestionGroup) => void,
  onSave: () => Promise<void>
};

const QuestionGroupDetails = (props: QuestionGroupDetailsProps) => {
  const {questionGroup, setQuestionGroup, onSave} = props;

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuestionGroup = questionGroup?.clone();
    if (newQuestionGroup) {
      newQuestionGroup.name = event.target.value;
      setQuestionGroup(newQuestionGroup);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>{questionGroup.name}</Typography>

      <TextField
        label="Question"
        value={questionGroup.name}
        onChange={onNameChange}
        fullWidth
      />

      <Button variant="contained" color="secondary" onClick={onSave}>
        Save
      </Button>
    </div>
  );
};

export default QuestionGroupDetails;
