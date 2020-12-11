import {useState, useCallback} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, orange } from '@material-ui/core/colors';

import Questions from './Questions';

import {addQuestion, getRandomQuestion} from './questionsApi';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: orange
  },
});

const useStyles = makeStyles({
  appRoot: {
    height: '100vh'
  }
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
    <div className={classes.appRoot}>
      <ThemeProvider theme={theme}>
        <Box height="100%" display="flex" flexDirection="column">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">
                Questions
              </Typography>
            </Toolbar>
          </AppBar>

          <Box flex="1 1 auto">
            <Box height="100%" display="flex" flexDirection="row" flexWrap="nowrap">
              <Box flex="0 0 30%" height="100%" borderRight="1px solid #9E9E9E" padding="8px">
                <Button variant="contained" color="secondary" onClick={onPickQuestionClick}>
                  Pick a random question
                </Button>
                
                <Questions />
              </Box>

              <Box flex="1 1 auto" height="100%" padding="8px">
                <TextField id="newQuestion" label="Question" value={newQuestion} onChange={onNewQuestionChange} />
                <Fab color="primary" aria-label="add question" onClick={onAddQuestionClick}>
                  <AddIcon />
                </Fab>

                <div>{(randomQuestion !== null) ? randomQuestion.question : ''}</div>
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
