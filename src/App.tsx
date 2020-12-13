import React, {useState, useEffect, useCallback} from 'react';

import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import {useAuth} from 'reactfire';

import {Switch, Route, useHistory} from "react-router-dom";

import {makeStyles} from '@material-ui/core/styles';

import Questions from './components/Questions';
import QuestionDetailsPage from './components/QuestionDetailsPage';
import SignInPage from './components/SignInPage';

import {useSignedIn} from './services/SignedIn';

const useStyles = makeStyles({
  appRoot: {
    height: '100vh'
  },
  appName: {
    flexGrow: 1
  }
});

function App() {
  const classes = useStyles();

  const auth = useAuth();
  const signedIn = useSignedIn();
  
  const [userAccountAnchorEl, setUserAccountAnchorEl] = useState<null | HTMLElement>(null);
  const userAccountOpen = Boolean(userAccountAnchorEl);

  const history = useHistory();

  const onOpenUserAccount = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setUserAccountAnchorEl(event.currentTarget);
  }, [setUserAccountAnchorEl]);
  const onCloseUserAccount = useCallback(() => {
    setUserAccountAnchorEl(null);
  }, [setUserAccountAnchorEl]);

  const onSignOut = useCallback(() => {
    auth.signOut()
        .then(() => {
          console.log('signed out');
        });
    onCloseUserAccount();
  }, [auth, onCloseUserAccount]);

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
            <Typography variant="h6" className={classes.appName}>
              Questions
            </Typography>

            {signedIn && (
              <div>
                <IconButton
                  aria-label="user account"
                  aria-controls="user-account"
                  aria-haspopup="true"
                  onClick={onOpenUserAccount}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="user-account"
                  anchorEl={userAccountAnchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={userAccountOpen}
                  onClose={onCloseUserAccount}
                >
                  <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        {signedIn && (
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
        )}

        {!signedIn && (
          <SignInPage />
        )}
      </Box>
    </div>
  );
}

export default App;
