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
import {addIds} from './utils/ads';
import {InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';
const Root = () => {
  LogBox.ignoreAllLogs();
  let lastBackButtonPress = 0;
  const interestitial = InterstitialAd.createForAdRequest(addIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
  });
  const showAdd = () => {
    const unsubscrib = interestitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interestitial.show();
        BackHandler.exitApp();
      },
    );
    interestitial.load();
    return unsubscrib;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const currentTime = new Date().getTime();
        if (currentTime - lastBackButtonPress < 2000) {
          showAdd();
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
      <StatusBar backgroundColor="#3668a3" />
      <Provider store={sightStore}>
        <Navigation />
      </Provider>
    </SafeAreaView>
  );
};

export default Root;
