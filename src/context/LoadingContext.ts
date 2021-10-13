import React from 'react';

const LoadingContext = React.createContext({
  loading: false,
  setLoading: (loading: boolean) => {

  }
});

export default LoadingContext;
