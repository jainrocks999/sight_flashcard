import {Platform} from 'react-native';

const productSkus = Platform.select({
  android: ['sightwords_indadsproduct'],
  ios: ['com.eflashapps.swflashcards.proupgrade'],
});
export default {
  productSkus: productSkus,
};
