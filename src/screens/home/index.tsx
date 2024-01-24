import {View, ImageBackground, TouchableOpacity, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux';
import playerCopy from '../../utils/player copy';
import {getBackSound, isWelcomeSound} from '../../redux/reducers';
import TrackPlayer from 'react-native-track-player';
import MyModal from '../../components/Modal';
type Props = StackScreenProps<StackNavigationParams, 'home'>;
const Home: React.FC<Props> = ({navigation}) => {
  const welcomSound = useSelector((state: rootState) => state.data.welcomSound);
  const setting = useSelector((state: rootState) => state.data.settings);
  const intrial = InterstitialAd.createForAdRequest(
    TestIds.INTERSTITIAL,
    //ca-app-pub-3339897183017333/6778947585,
    {
      requestNonPersonalizedAdsOnly: false,
    },
  );
  // useEffect(() => {
  //   try {
  //     const unsubscrib = intrial.addAdEventListener(AdEventType.LOADED, () => {
  //       intrial.show();
  //     });
  //     intrial.load();
  //     return unsubscrib;
  //   } catch (erro) {
  //     console.log('error', erro);
  //   }
  // }, []);
  const dispatcch = useDispatch();
  const handleNaviagtion = async (page: string) => {
    await TrackPlayer.reset();
    dispatcch({
      type: 'sightCards/setPage',
      payload: page,
    });
    dispatcch(
      getBackSound({
        normal: setting.Question !== 1 ? true : false,
        question: setting.Question == 1 ? false : true,
      }),
    );
    navigation.navigate(
      setting.Question == 1 && page != 'practice' ? 'question' : 'preprimary',
    );
  };

  useEffect(() => {
    playsound();
  }, [welcomSound]);
  const playsound = async () => {
    const track = {
      url: 'asset:/files/baby_flash_theme.mp3',
      title: 'baby_flash_theme',
      artist: 'eFlashApps',
      artwork: 'asset:/files/soundclick.mp3',
      duration: 5,
    };

    welcomSound ? await playerCopy([track]) : await TrackPlayer.reset();
  };
  const [visible, setIsvisible] = useState(false);

  return (
    <ImageBackground
      resizeMode="stretch"
      style={styles.container}
      source={require('../../assets/images/screen.png')}>
      <Header
        isMuted={welcomSound}
        onRightPress={() => {
          navigation.navigate('setting', {page: 'home'});
        }}
        onLeftPress={() => {
          dispatcch(isWelcomeSound(!welcomSound));
        }}
        details={false}
        onCenterPress={() => {
          null;
        }}
        isAddeToPractice={false}
        page=""
        isQuestion={false}
      />
      <View style={styles.catagoryContainer}>
        <MyModal
          ishome
          isVisible={visible}
          txt="More Sight Words! We are proud to feature several interactive apps for early childhood education. Click on More Apps to see our collection of Apps available for download!"
          onPress={item => {
            setIsvisible(item);
          }}
          onPressLinking={bool => {
            Linking.openURL('https://babyflashcards.com/apps.html');
            setIsvisible(bool);
          }}
        />
        <View style={styles.prekinderContainer}>
          <TouchableOpacity
            onPress={() => {
              handleNaviagtion('Primary');
            }}
            style={styles.imgBtn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/images/primaryy.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleNaviagtion('Kinder');
            }}
            style={styles.imgBtn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/images/kinderr.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.prekinderContainer}>
          <TouchableOpacity
            onPress={() => handleNaviagtion('GradeOne')}
            style={styles.imgBtn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/images/grade_one.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNaviagtion('GradeTwo')}
            style={styles.imgBtn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/images/grade_two.png')}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleNaviagtion('AllIntOne');
          }}
          style={styles.allinone}>
          <Image
            resizeMode="stretch"
            style={styles.img}
            source={require('../../assets/images/allinone.png')}
          />
        </TouchableOpacity>
        <View style={styles.practicemore}>
          <TouchableOpacity
            onPress={() => {
              handleNaviagtion('practice');
            }}
            style={styles.secondBtn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/images/practices.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsvisible(true);
            }}
            style={styles.secondBtn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/images/moreapps.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={{position: 'absolute', bottom: 0}}>
        <GAMBannerAd
          unitId={
            //'ca-app-pub-3339897183017333/5302214382'
            TestIds.BANNER
          }
          sizes={[BannerAdSize.FULL_BANNER]}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View> */}
    </ImageBackground>
  );
};

export default Home;
