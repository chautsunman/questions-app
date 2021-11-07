import React from 'react';

interface ILoadingContext {
  _loading: number;
  isLoading: () => boolean;
  addLoading: () => void;
  removeLoading: () => void;
}

const LoadingContext = React.createContext<ILoadingContext>({
  _loading: 0,
  isLoading: () => false,
  addLoading: () => {},
  removeLoading: () => {}
});

export default LoadingContext;
