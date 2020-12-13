import {useState, useEffect} from 'react';

import {useUser} from 'reactfire';

import {signIn} from './authApi';

export const useSignedIn = () => {
  const {data: user} = useUser();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (!user) {
      setSignedIn(false);
      return;
    }

    signIn(user.uid)
        .then((signedIn) => {
          console.log('server sign in', signedIn);
          setSignedIn(signedIn);
        })
        .catch((err) => {
          console.log('server sign in error', err);
          setSignedIn(false);
        });
  }, [user]);

  return signedIn;
};
