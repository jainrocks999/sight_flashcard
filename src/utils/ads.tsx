import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';
export const addIds = {
  BANNER: TestIds.BANNER, //'ca-app-pub-3339897183017333/5302214382',
  INTERSTITIAL: TestIds.INTERSTITIAL, //'ca-app-pub-3339897183017333/6778947585',
};
const interestitial = InterstitialAd.createForAdRequest(addIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
});
export default () => {
  const listner = interestitial.addAdEventListener(AdEventType.LOADED, () => {
    interestitial.show();
  });
  interestitial.load();
  return () => {
    listner();
  };
};
