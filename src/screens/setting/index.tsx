import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StackNavigationParams} from '../../components/navigation';
import styles from './styles';
import Check from '../../components/Check';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'react-native-animatable';
import playerCopy from '../../utils/player copy';
import TrackPlayer from 'react-native-track-player';
import {getBackSound, isWelcomeSound} from '../../redux/reducers';
import {BannerAdSize, GAMBannerAd} from 'react-native-google-mobile-ads';
import {addIds} from '../../utils/ads';
import {IAPContext} from '../../Context';
import { path } from '../../utils/path';
type Props = StackScreenProps<StackNavigationParams, 'setting'>;
const Setting: React.FC<Props> = ({navigation, route}) => {
  const IAP = useContext(IAPContext);
  const backSound = useSelector((state: rootState) => state.data.backSound);
  const Category = useSelector((state: rootState) => state.data.Catagory);
  const page = route.params.page;
  const dispatch = useDispatch();
  const settings = useSelector((state: rootState) => state.data.settings);
  console.log(settings);
  const [setting, setSeting] = useState({
    Question: settings.Question,
    RandomOrder: settings.RandomOrder,
    Swipe: settings.Swipe,
    Voice: settings.Voice,
    _id: 1,
  });
  const [qursion, setQuestion] = useState(settings.Question);

  const resetNavigation = (routes: any[]) => {
    navigation.reset({
      index: 0,
      routes,
    });
  };

  const resetWithRoutes = (routes: any[]) => {
    resetNavigation([...routes]);
  };

  const handleBackSoundDispatch = () => {
    for (const key in backSound) {
      let validKey = key as keyof typeof backSound;
      if (backSound[validKey]) {
        dispatch(getBackSound({...backSound, [key]: false}));
      }
    }
  };

  const saveOperation = async () => {
    await AsyncStorage.setItem('setting', JSON.stringify(setting));

    dispatch({
      type: 'sightCards/getSettings',
      payload: setting,
    });

    if (qursion !== 1) {
      if (setting.Question === 1 && Category != 'practice') {
        resetWithRoutes([{name: 'question'}]);
      } else {
        navigation.goBack();
        handleBackSoundDispatch();
      }
    } else {
      if (setting.Question !== 1 && Category != 'practice') {
        resetWithRoutes([{name: 'preprimary'}]);
      } else {
        navigation.goBack();
        handleBackSoundDispatch();
      }
    }
  };

  const cancelOperation = () => {
    handleBackSoundDispatch();
    navigation.goBack();
  };

  const onSaveCancel = async (operation: string) => {
    await TrackPlayer.reset();

    if (operation === 'save') {
      await saveOperation();
    } else {
      cancelOperation();
    }
  };
  const welcomSound = useSelector((state: rootState) => state.data.welcomSound);
  useEffect(() => {
    playsound();
  }, [welcomSound]);
  const playsound = async () => {
    const track = {
      url: `${path}baby_flash_theme.mp3`,
      title: 'baby_flash_theme',
      artist: 'eFlashApps',
      artwork: `${path}baby_flash_theme.mp3`,
      duration: 5,
    };

    welcomSound ? await playerCopy([track]) : await TrackPlayer.reset();
  };
  const handleOnBoxPress = (name: string, value: number) => {
    setSeting(prev => ({...prev, [name]: value}));
  };
  useEffect(() => {
    const back = BackHandler.addEventListener('hardwareBackPress', () => {
      if (page == 'home') {
        navigation.reset({index: 0, routes: [{name: 'home'}]});
      } else {
        onSaveCancel('cancle');
      }
      return true;
    });
    return () => back.remove();
  });
  return (
    <ImageBackground
      style={{flex: 1}}
      resizeMode="stretch"
      source={require('../../assets/images/setting_screen.png')}>
      <TouchableOpacity
        onPress={() => {
          dispatch(isWelcomeSound(!welcomSound));
        }}
        style={styles.soundBtn}>
        <Image
          style={styles.image}
          source={
            welcomSound
              ? require('../../assets/images/speakar57.png')
              : require('../../assets/images/speakar58.png')
          }
        />
      </TouchableOpacity>
      <View
        style={[styles.container, {height: IAP?.hasPurchased ? '81%' : '72%'}]}>
        <ImageBackground
          style={styles.settingBg}
          resizeMode="stretch"
          source={require('../../assets/images/setting_bg.png')}>
          <Check
            isSelected={setting.Voice}
            title="Voice"
            onPress={handleOnBoxPress}
            name="Voice"
          />
          <Check
            isSelected={setting.RandomOrder}
            title="Random Order"
            onPress={handleOnBoxPress}
            name="RandomOrder"
          />
          <Check
            isSelected={setting.Question}
            title="Question"
            onPress={handleOnBoxPress}
            name="Question"
          />
          <Check
            isSelected={setting.Swipe}
            title="Swipe"
            onPress={handleOnBoxPress}
            name="Swipe"
          />
        </ImageBackground>
      </View>
      <View style={styles.btncontainer}>
        <TouchableOpacity
          onPress={() => {
            if (page == 'home') {
              navigation.reset({index: 0, routes: [{name: 'home'}]});
            } else {
              onSaveCancel('cancle');
            }
          }}
          style={styles.btn}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../../assets/images/cancel.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (page == 'home') {
              dispatch({
                type: 'sightCards/getSettings',
                payload: setting,
              });
              navigation.reset({index: 0, routes: [{name: 'home'}]});
            } else {
              onSaveCancel('save');
            }
          }}
          style={styles.btn}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('../../assets/images/save.png')}
          />
        </TouchableOpacity>
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

export default Setting;
