import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store, persistor } from '../components/store';
import { PersistGate } from 'redux-persist/integration/react';
import TopNav from '../components/TopNav';

export default function Layout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TopNav /> {/* ✅ Persistent Top Navigation */}
        <Stack screenOptions={{ headerShown: false }} />
      </PersistGate>
    </Provider>
  );
}
