import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import { makeStyles } from '@material-ui/core';

import LoadingContext from './LoadingContext';

interface LoadingCompProps {
  children: React.ReactNode
}

const useStyles = makeStyles({
  root: {
    position: 'relative'
  },
  loadingComp: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    zIndex: 1000000,
    backgroundColor: 'black',
    opacity: 0.5
  }
});

const _LoadingComp = () => {
  const classes = useStyles();

  return (
    <div className={classes.loadingComp}>
      <CircularProgress />
    </div>
  );
};

const LoadingComp = (props: LoadingCompProps) => {
  const classes = useStyles();

  return (
    <LoadingContext.Consumer>
      {({loading}) => (
        <div className={classes.root}>
          {props.children}

          {loading && <_LoadingComp />}
        </div>
      )}
    </LoadingContext.Consumer>
  );
};

export default LoadingComp;
