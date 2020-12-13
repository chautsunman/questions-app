import React, {useCallback} from 'react';

import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import {Switch, Route, useHistory} from "react-router-dom";

import {makeStyles} from '@material-ui/core/styles';

import Questions from './components/Questions';
import QuestionDetailsPage from './components/QuestionDetailsPage';

const useStyles = makeStyles({
  appRoot: {
    height: '100vh'
  }
});

function App() {
  const classes = useStyles();

  const history = useHistory();

  const onNewQuestionClick = useCallback(() => {
    history.push('/question/newQuestion');
  }, [history]);

  const onPickQuestionClick = useCallback(async () => {
    console.log('Pick a random question');
    history.push(`/question/randomQuestion?id=${new Date().getTime()}`);
  }, [history]);
  
  return (
    <div className={classes.appRoot}>
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

              <Fab color="primary" aria-label="new question" onClick={onNewQuestionClick}>
                <AddIcon />
              </Fab>
              
              <Questions />
            </Box>

            <Box flex="1 1 auto" height="100%" padding="8px">
              <Switch>
                <Route path="/question">
                  <QuestionDetailsPage />
                </Route>

                <Route path="/" exact>
                  View question details.
                </Route>
              </Switch>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
