import Amplify, { Hub, DataStore } from "aws-amplify";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { jwtInterceptorError } from "./interceptors/error-interceptor";
import { jwtInterceptor } from "./interceptors/interceptor";
import Navigation from "./navigation";
import config from "./src/aws-exports";
import { Message, MessageStatus } from "./src/models";
import { store } from "./store/store";

Amplify.configure(config);
jwtInterceptor();
jwtInterceptorError();

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // Listening update amplify store
  useEffect(() => {
    const listener = Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (
        event === "outboxMutationProcessed" &&
        data.model === Message &&
        !["DELIVERED", "READ"].includes(data.element.status)
      ) {
        // set the message status to delivered
        DataStore.save(
          Message.copyOf(data.element, (updated) => {
            updated.status = "DELIVERED";
          })
        );
      }
    });

    // Remove listener
    return () => listener();
  }, []);

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
