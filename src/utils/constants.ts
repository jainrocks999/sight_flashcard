import {Platform} from 'react-native';

const productSkus = Platform.select({
  android: ['sightwords_indadsproduct'],
  ios: ['com.eflash.eFlash.proupgrade'],
});
export default {
  productSkus: productSkus,
};
