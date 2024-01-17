import {View, ImageBackground, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StackNavigationParams} from '../../components/navigation';
import styles from './styles';
import Header from '../../components/header';
import {Image} from 'react-native-animatable';
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
type Props = StackScreenProps<StackNavigationParams, 'home'>;
const Home: React.FC<Props> = ({navigation}) => {
  const intrial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: false,
  });
  useEffect(() => {
    const unsubscrib = intrial.addAdEventListener(AdEventType.LOADED, () => {
      intrial.show();
    });
    intrial.load();

    return unsubscrib;
  }, []);
  return (
    <ImageBackground
      resizeMode="stretch"
      style={styles.container}
      source={require('../../assets/images/screen.png')}>
      <Header
        isMuted={false}
        onRightPress={() => {
          null;
        }}
        onLeftPress={() => {
          null;
        }}
        page=""
      />
      <View style={styles.catagoryContainer}>
        <View style={styles.prekinderContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('preprimary')}
            style={styles.imgBtn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/images/primaryy.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imgBtn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/images/kinderr.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.prekinderContainer}>
          <TouchableOpacity style={styles.imgBtn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/images/grade_one.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imgBtn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/images/grade_two.png')}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.allinone}>
          <Image
            resizeMode="stretch"
            style={styles.img}
            source={require('../../assets/images/allinone.png')}
          />
        </TouchableOpacity>
        <View style={styles.practicemore}>
          <TouchableOpacity style={styles.secondBtn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/images/practices.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondBtn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/images/moreapps.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{position: 'absolute', bottom: 0}}>
        <GAMBannerAd
          unitId={'ca-app-pub-3339897183017333/6778947585'}
          sizes={[BannerAdSize.FULL_BANNER]}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default Home;
