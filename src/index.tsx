import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router} from "react-router-dom";

import { FirebaseAppProvider, AuthProvider, useFirebaseApp } from 'reactfire';
import {getAuth, connectAuthEmulator} from 'firebase/auth';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, orange } from '@material-ui/core/colors';

import './index.css';

import App from './App';

import LoadingContext from './context/LoadingContext';

import firebaseConfig from './firebaseConfig.json';

import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: orange
  },
});

const Root = () => {
  const app = useFirebaseApp();
  const auth = getAuth(app);

  if (process.env.NODE_ENV !== 'production') {
    // Set up emulators
    if (process.env.REACT_APP_FIREBASE_EMULATE === 'true') {
      connectAuthEmulator(auth, 'http://localhost:9099');
    }
  }

  const [loading, setLoading] = useState(false);

  return (
    <AuthProvider sdk={auth}>
      <ThemeProvider theme={theme}>
        <Router>
          <LoadingContext.Provider value={{loading, setLoading}}>
            <App />
          </LoadingContext.Provider>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Root/>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
