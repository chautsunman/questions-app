import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';

import Questions from './Questions';

import './App.css';

const useStyles = makeStyles({
  body: {}
});

function App() {
  const classes = useStyles();

  const pickQuestion = () => {
    console.log('Pick a random question');
  };

  const addQuestion = () => {
    console.log('Add a question');
  };
  
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

        <Button variant="contained" color="primary" onClick={pickQuestion}>
          Pick a random question
        </Button>

        <Fab color="primary" aria-label="add question" onClick={addQuestion}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}

export default App;
