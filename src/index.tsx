import React, { useState, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router} from "react-router-dom";

import { FirebaseAppProvider, AuthProvider, StorageProvider, useFirebaseApp } from 'reactfire';
import {getAuth, connectAuthEmulator} from 'firebase/auth';
import { getStorage, connectStorageEmulator } from "firebase/storage";

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, orange } from '@material-ui/core/colors';

import './index.css';

import App from './App';

import LoadingContext from './context/LoadingContext';

import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
  measurementId: process.env.REACT_APP_FIREBASE_measurementId
};

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: orange
  },
});

interface FirebaseDevProps {
  children: React.ReactNode
}

const FirebaseDev = (props: FirebaseDevProps) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const storage = getStorage();

  if (process.env.NODE_ENV !== 'production') {
    // Set up emulators
    if (process.env.REACT_APP_FIREBASE_EMULATE === 'true') {
      connectAuthEmulator(auth, 'http://localhost:9099');
      connectStorageEmulator(storage, "localhost", 9199);
    }
  }

  return <div>{props.children}</div>;
};

const Root = () => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const storage = getStorage();

  const [loading, setLoading] = useState(0);
  const isLoading = useCallback(() => loading > 0, [loading]);
  const addLoading = useCallback(() => {
    setLoading((oldLoading) => oldLoading + 1);
  }, [setLoading]);
  const removeLoading = useCallback(() => {
    setLoading((oldLoading) => oldLoading - 1);
  }, [setLoading]);
  const loadingContextVal = useMemo(() => ({
    _loading: loading,
    isLoading,
    addLoading,
    removeLoading
  }), [loading, isLoading, addLoading, removeLoading]);

  return (
    <AuthProvider sdk={auth}>
      <StorageProvider sdk={storage}>
        <ThemeProvider theme={theme}>
          <Router>
            <LoadingContext.Provider value={loadingContextVal}>
              <App />
            </LoadingContext.Provider>
          </Router>
        </ThemeProvider>
      </StorageProvider>
    </AuthProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseDev>
        <Root/>
      </FirebaseDev>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
