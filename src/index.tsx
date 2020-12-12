import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router} from "react-router-dom";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, orange } from '@material-ui/core/colors';

import './index.css';

import App from './App';

import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: orange
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
