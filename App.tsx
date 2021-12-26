import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { Provider } from 'react-redux';
import { store } from './store/store';

import Amplify, {Auth} from 'aws-amplify';

import config from './src/aws-exports';
// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(config);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
      </Provider>

    );
  }
}

// export default App;

export default withAuthenticator(App);
