import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';

import { Platform } from 'react-native';


export const addIds = {
  ...Platform.select({
    android: {
      BANNER: 'ca-app-pub-3339897183017333/5302214382',
  INTERSTITIAL: 'ca-app-pub-3339897183017333/6778947585',
    },
    ios: {
      BANNER: 'ca-app-pub-3339897183017333/2907151186',
      INTERSTITIAL: 'ca-app-pub-3339897183017333/4783868389',
    },
  }),
};

const requestOption = {
  requestNonPersonalizedAdsOnly: true,
};
const interestitial = InterstitialAd.createForAdRequest(
  addIds.INTERSTITIAL,
  requestOption,
);
export default () => {
  const listner = interestitial.addAdEventListener(AdEventType.LOADED, () => {
    interestitial.show();
  });
  interestitial.load();
  return () => {
    listner();
  };
};
