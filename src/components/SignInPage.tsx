import {useCallback} from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignInPage = () => {
  const auth = getAuth();

  const onGoogleSignIn = useCallback(() => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then(() => {
          console.log('signed in');
        })
        .catch((err) => {
          console.log('sign in error', err);
        });
  }, [auth]);

  return (
    <Box padding="16px">
      <Button variant="contained" color="secondary" onClick={onGoogleSignIn}>
        Sign in with Google
      </Button>
    </Box>
  );
};

export default SignInPage;
