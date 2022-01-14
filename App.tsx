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
import { jwtInterceptorError } from './interceptors/error-interceptor';
import { jwtInterceptor } from './interceptors/interceptor';
Amplify.configure(config);
jwtInterceptor();
jwtInterceptorError();

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

export default App;

// export default withAuthenticator(App);
