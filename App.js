import React, { useState, useEffect } from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar, Platform } from 'react-native'
import { Root } from 'native-base';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from './src/screens/Splash';
import { store } from './src/redux/store';
import NavigatorProvider from './src/navigator';
import { setupHttpConfig } from './src/utils/http';
import { Colors } from 'src/theme'
const persistor = persistStore(store);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAssets();
  });

  useEffect(() => {
    StatusBar.setBarStyle(Platform.OS === "ios" ? "dark-content" : "default")
  }, [])

  const loadAssets = () => {
    setTimeout(() => {
      setupHttpConfig(setIsLoading);
    }, 500);
  };

  const renderLoading = () => (
    <SplashScreen />
  );

  const renderApp = () => (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <Root>
            <NavigatorProvider />
            <FlashMessage />
          </Root>
        </ApplicationProvider>
      </PersistGate>
    </ReduxProvider>
  );

  return isLoading ? renderLoading() : renderApp();
};

export default () => <App />;