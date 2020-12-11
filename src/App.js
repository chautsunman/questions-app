import {useState, useCallback} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';

import Questions from './Questions';

import {addQuestion, getRandomQuestion} from './questionsApi';

import './App.css';

const useStyles = makeStyles({
  body: {}
});

function App() {
  const classes = useStyles();

  const [newQuestion, setNewQuestion] = useState('');
  const [randomQuestion, setRandomQuestion] = useState(null);

  const onNewQuestionChange = useCallback((event) => {
    setNewQuestion(event.target.value);
  }, []);

  const onAddQuestionClick = useCallback(async () => {
    console.log('Add a question', newQuestion);
    if (newQuestion !== '') {
      await addQuestion(newQuestion);
    }
  }, [newQuestion]);

  const onPickQuestionClick = useCallback(async () => {
    console.log('Pick a random question');
    const question = await getRandomQuestion();
    setRandomQuestion(question);
  });
  
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Questions
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.body}>
        <Questions />

        <Button variant="contained" color="primary" onClick={onPickQuestionClick}>
          Pick a random question
        </Button>

        <TextField id="newQuestion" label="Question" value={newQuestion} onChange={onNewQuestionChange} />
        <Fab color="primary" aria-label="add question" onClick={onAddQuestionClick}>
          <AddIcon />
        </Fab>

        <div>{(randomQuestion !== null) ? randomQuestion.question : ''}</div>
      </div>
    </div>
  );
}

export default App;
