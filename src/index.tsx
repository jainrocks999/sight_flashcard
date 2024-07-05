import {
  SafeAreaView,
  LogBox,
  StatusBar,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import Navigation from './components/navigation';
import {Provider} from 'react-redux';
import {sightStore} from './redux';
import IAPProvider from './Context';
const Root = () => {
  LogBox.ignoreAllLogs();
  let lastBackButtonPress = 0;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const currentTime = new Date().getTime();
        if (currentTime - lastBackButtonPress < 2000) {
          BackHandler.exitApp();
        } else {
          ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
          lastBackButtonPress = currentTime;
        }
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <IAPProvider>
        <StatusBar backgroundColor="#3668a3" />
        <Provider store={sightStore}>
          <Navigation />
        </Provider>
      </IAPProvider>
    </SafeAreaView>
  );
};

export default Root;
