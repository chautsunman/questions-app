import {useCallback, useContext} from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import LoadingContext from '../context/LoadingContext';

const SignInPage = () => {
  const auth = getAuth();

  const {addLoading, removeLoading} = useContext(LoadingContext);

  const onGoogleSignIn = useCallback(() => {
    const provider = new GoogleAuthProvider();

    addLoading();

    signInWithPopup(auth, provider)
        .then(() => {
          console.log('signed in');
          return true;
        })
        .catch((err) => {
          console.log('sign in error', err);
          return true;
        })
        .then(() => {
          removeLoading();
        });
  }, [auth, addLoading, removeLoading]);

  return (
    <Box padding="16px">
      <Button variant="contained" color="secondary" onClick={onGoogleSignIn}>
        Sign in with Google
      </Button>
    </Box>
  );
};

export default SignInPage;
