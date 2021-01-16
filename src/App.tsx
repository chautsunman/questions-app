import React, {useState, useCallback} from 'react';

import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import {useAuth} from 'reactfire';

import {Switch, Route, useHistory} from "react-router-dom";

import {makeStyles} from '@material-ui/core/styles';

import QuestionGroups from './components/QuestionGroups';
import QuestionsPage from './components/QuestionsPage';
import QuestionGroupDetailsPage from './components/QuestionGroupDetailsPage';
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

  const _goHome = useCallback((replace: boolean) => {
    if (!replace) {
      history.push('/');
    } else {
      history.replace('/');
    }
  }, [history]);
  const goHome = useCallback(() => _goHome(false), [_goHome]);

  const onOpenUserAccount = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setUserAccountAnchorEl(event.currentTarget);
  }, [setUserAccountAnchorEl]);
  const onCloseUserAccount = useCallback(() => {
    setUserAccountAnchorEl(null);
  }, [setUserAccountAnchorEl]);

  const onSignOut = useCallback(() => {
    _goHome(true);
    auth.signOut()
        .then(() => {
          console.log('signed out');
        });
    onCloseUserAccount();
  }, [auth, _goHome, onCloseUserAccount]);

  return (
    <div className={classes.appRoot}>
      <Box height="100%" display="flex" flexDirection="column">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.appName} onClick={goHome}>
              Questions
            </Typography>

            {signedIn.signedIn && (
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

        {signedIn.signedIn && (
          <Box flex="1 1 auto">
            <Box height="100%" display="flex" flexDirection="row" flexWrap="nowrap">
              <Box flex="0 0 30%" height="100%" borderRight="1px solid #9E9E9E" display="flex" flexDirection="column">
                <Box flex="0 0 30%" borderBottom="1px solid #9E9E9E" padding="16px">
                  <QuestionGroups />
                </Box>

                <Box flex="0 0 70%" padding="16px">
                  <QuestionsPage />
                </Box>
              </Box>

              <Box flex="1 1 auto" height="100%">
                <Switch>
                  <Route path="/question/:questionGroupId/:questionId">
                    <QuestionDetailsPage />
                  </Route>

                  <Route path="/questionGroup/:questionGroupId">
                    <QuestionGroupDetailsPage />
                  </Route>

                  <Route path="/" exact>
                    <Typography variant="h2">
                      Questions
                    </Typography>
                  </Route>
                </Switch>
              </Box>
            </Box>
          </Box>
        )}

        {!signedIn.signedIn && (
          <SignInPage />
        )}
      </Box>
    </div>
  );
}

export default App;
