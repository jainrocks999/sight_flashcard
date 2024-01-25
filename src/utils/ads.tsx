import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';
export const addIds = {
  BANNER: 'ca-app-pub-3339897183017333/5302214382',
  INTERSTITIAL: 'ca-app-pub-3339897183017333/6778947585',
};
const interestitial = InterstitialAd.createForAdRequest(addIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
});
export default () => {
  const rm = interestitial.addAdEventListener(AdEventType.LOADED, () => {
    interestitial.show();
  });
  interestitial.load();
  return () => {
    rm;
  };
};
