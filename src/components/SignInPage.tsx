import {useCallback} from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import LoadingContext from '../context/LoadingContext';

const SignInPage = () => {
  const auth = getAuth();

  const onGoogleSignIn = useCallback((setLoading: (loading: boolean) => void) => {
    const provider = new GoogleAuthProvider();

    // setLoading(true);

    signInWithPopup(auth, provider)
        .then(() => {
          console.log('signed in');
        })
        .catch((err) => {
          console.log('sign in error', err);
        })
        .then(() => {
          // setLoading(false);
        });
  }, [auth]);

  return (
    <LoadingContext.Consumer>
      {({setLoading}) => (
        <Box padding="16px">
          <Button variant="contained" color="secondary" onClick={() => onGoogleSignIn(setLoading)}>
            Sign in with Google
          </Button>
        </Box>
      )}
    </LoadingContext.Consumer>
  );
};

export default SignInPage;
