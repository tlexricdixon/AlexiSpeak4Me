import React from 'react';
import { Provider} from 'react-redux';
import { store, persistor} from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {

  return (
    
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer> {/* ✅ Only ONE NavigationContainer */}
         
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;








