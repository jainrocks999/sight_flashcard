import {View, ImageBackground, TouchableOpacity, Linking} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StackNavigationParams} from '../../components/navigation';
import styles from './styles';
import Header from '../../components/header';
import {Image} from 'react-native-animatable';
import {GAMBannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux';
import playerCopy from '../../utils/player copy';
import {getBackSound, isWelcomeSound} from '../../redux/reducers';
import TrackPlayer from 'react-native-track-player';
import MyModal from '../../components/Modal';
import {addIds} from '../../utils/ads';
import {IAPContext} from '../../Context';
import PurchasedeModal from '../../components/PurchaseModal';
import { path} from '../../utils/path';
type Props = StackScreenProps<StackNavigationParams, 'home'>;
const Home: React.FC<Props> = ({navigation}) => {
  const IAP = useContext(IAPContext);
  const welcomSound = useSelector((state: rootState) => state.data.welcomSound);
  const setting = useSelector((state: rootState) => state.data.settings);

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
      url: `${path}baby_flash_theme.mp3`,
      title: 'baby_flash_theme',
      artist: 'eFlashApps',
      artwork: `${path}soundclick.mp3`,
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
        {!IAP?.hasPurchased && (
          <PurchasedeModal
            visible={IAP?.visible || false}
            onRestore={() => {
              IAP?.checkPurchases(true);
            }}
            onPress={() => {
              IAP?.requestPurchase();
            }}
            onClose={val => {
              IAP?.setVisible(false);
            }}
          />
        )}
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
              // showAd();
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
          {!IAP?.hasPurchased && (
            <TouchableOpacity
              onPress={() => {
                IAP?.setVisible(true);
              }}
              style={styles.secondBtn}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={require('../../assets/images/ad-freennn.png')}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {!IAP?.hasPurchased && (
        <View style={{position: 'absolute', bottom: 0}}>
          <GAMBannerAd
            unitId={addIds.BANNER}
            sizes={[BannerAdSize.ANCHORED_ADAPTIVE_BANNER]}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      )}
    </ImageBackground>
  );
};

export default Home;
