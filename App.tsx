import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import Navigation from './src/navigation/Navigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;

