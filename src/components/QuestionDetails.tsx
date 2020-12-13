import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Question from '../data/Question';

type QuestionDetailsProps = {
  question: Question,
  setQuestion: (newQuestion: Question) => void,
  onSave: () => Promise<void>
};

const QuestionDetails = (props: QuestionDetailsProps) => {
  const {question, setQuestion, onSave} = props;

  const onQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuestion = question?.clone();
    if (newQuestion) {
      newQuestion.question = event.target.value;
      setQuestion(newQuestion);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>{question.question}</Typography>

      <TextField
        label="Question"
        value={question.question}
        onChange={onQuestionChange}
        fullWidth
      />

      <Button variant="contained" color="secondary" onClick={onSave}>
        Save
      </Button>
    </div>
  );
};

export default QuestionDetails;
