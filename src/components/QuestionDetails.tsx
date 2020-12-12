import React, {useState, useEffect} from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {useLocation} from 'react-router-dom';

import Question from "../data/Question";

import {getQuestion, addQuestion, getRandomQuestion} from '../services/questionsApi';

type QuestionDetailsProps = {

};

const QuestionDetails = (props: QuestionDetailsProps) => {
  const [question, setQuestion] = useState(null as Question | null);

  const location = useLocation();
  const pathname = location.pathname;
  const urlParams = new URLSearchParams(location.search);

  useEffect(() => {
    (async () => {
      console.log('test', pathname, urlParams.get('id'));

      const pathnameSplit = pathname.split('/');
      if (pathnameSplit.length === 2 && urlParams.get('id')) {
        const questionId = urlParams.get('id');

        if (questionId) {
          const question = await getQuestion(questionId);
          setQuestion(question);
        }
        
      } else if (pathnameSplit.length === 3) {
        if (pathnameSplit[2] === 'newQuestion') {
          setQuestion(new Question());

        } else if (pathnameSplit[2] === 'randomQuestion') {
          const randomQuestion = await getRandomQuestion();
          setQuestion(randomQuestion);

        }
      }
    })();
  }, [pathname, urlParams.get('id')]);

  const onQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuestion = question?.clone();
    if (newQuestion) {
      newQuestion.question = event.target.value;
      setQuestion(newQuestion);
    }
  };

  if (!question) {
    return (
      <Typography variant="h4" gutterBottom>Question Details</Typography>
    );
  }
  
  return (
    <div>
      <Typography variant="h4" gutterBottom>{question.question}</Typography>

      <TextField
        label="Question"
        value={question.question}
        onChange={onQuestionChange}
        fullWidth
      />
    </div>
  );
};

export default QuestionDetails;
