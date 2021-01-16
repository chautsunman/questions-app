import {useState, useEffect} from 'react';

import {useAuth, useUser} from 'reactfire';

import {signIn} from './authApi';

class SignedIn {
  signedIn: boolean;
  uid: string | null;

  constructor(signedIn: boolean, uid: string | null) {
    this.signedIn = signedIn;
    this.uid = uid;
  }

  static getSignedIn(uid: string) {
    return new SignedIn(true, uid);
  }

  static getNotSignedIn() {
    return new SignedIn(false, null);
  }
}

export const useSignedIn = () => {
  const auth = useAuth();
  const {data: user} = useUser();
  const [signedIn, setSignedIn] = useState(SignedIn.getNotSignedIn());

  useEffect(() => {
    (async () => {
      if (!user) {
        setSignedIn(SignedIn.getNotSignedIn());
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
        setSignedIn(SignedIn.getSignedIn(user.uid));
      } else {
        console.log('server not signed in, sign out');
        await auth.signOut();
        setSignedIn(SignedIn.getNotSignedIn());
      }
    })();
  }, [auth, user]);

  return signedIn;
};
