import {useState, useEffect} from 'react';

import {useAuth, useUser} from 'reactfire';

import {signIn} from './authApi';

export const useSignedIn = () => {
  const auth = useAuth();
  const {data: user} = useUser();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      if (!user) {
        setSignedIn(false);
        return;
      }

      let signedIn: boolean;
      try {
        signedIn = await signIn();
      } catch (err) {
        console.log('server sign in error', err);
        return;
      }
      console.log('server sign in', signedIn);

      if (signedIn) {
        setSignedIn(true);
      } else {
        console.log('server not signed in, sign out');
        await auth.signOut();
        setSignedIn(false);
      }
    })();
  }, [auth, user]);

  return signedIn;
};
