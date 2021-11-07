import { useContext } from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import { makeStyles } from '@material-ui/core';

import LoadingContext from './LoadingContext';

const useStyles = makeStyles({
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

const LoadingComp = () => {
  const classes = useStyles();

  const {isLoading} = useContext(LoadingContext);

  if (!isLoading()) {
    return null;
  }

  return (
    <div className={classes.loadingComp}>
      <CircularProgress />
    </div>
  );
};

export default LoadingComp;
