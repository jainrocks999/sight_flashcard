import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Animated, {
  useSharedValue,
  Easing,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {StackScreenProps} from '@react-navigation/stack';
import {StackNavigationParams} from '../../components/navigation';
import styles from './styles';
import Header from '../../components/header';
import {rootState} from '../../redux';
import {createAnimatableComponent} from 'react-native-animatable';
import playerCopy from '../../utils/player copy';
import {dbData, dbItem} from '../../types';
import GestureRecognizer from 'react-native-swipe-gestures';
import {heightPercent as hp} from '../../utils/ResponsiveScreen';
import {getBackSound} from '../../redux/reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyModal from '../../components/Modal';
import db from '../../utils/db';
import {BannerAdSize, GAMBannerAd} from 'react-native-google-mobile-ads';
import showAdd, {addIds} from '../../utils/ads';
import {IAPContext} from '../../Context';

type Props = StackScreenProps<StackNavigationParams, 'preprimary'>;
const AnimatedFlatlist = createAnimatableComponent(FlatList);

const PrePrimary: React.FC<Props> = ({navigation}) => {
  const IAP = useContext(IAPContext);
  const dispatch = useDispatch();
  const dbdata = useSelector((state: rootState) => state.data.dbData);
  const backSound = useSelector((state: rootState) => state.data.backSound);
  const Category = useSelector((state: rootState) => state.data.Catagory);
  const [data, setData] = useState<dbData>([]);
  const setting = useSelector((state: rootState) => state.data.settings);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getPracticeItem();
  }, []);
  const [addedPractice, setAddPractice] = useState<dbData>([]);
  const [isVisible, setIsvisible] = useState(false);

  const getPracticeItem = async () => {
    const practiceItemsStr = await AsyncStorage.getItem('practice');

    const practiceItems: dbData = (await JSON.parse(
      practiceItemsStr !== null ? practiceItemsStr : '[]',
    )) as dbData;
    if (practiceItems.length <= 0 && Category == 'practice') {
      setIsvisible(true);
    }
    setAddPractice(practiceItems);
  };

  const radnomAray = (array: dbData, lenght: number) => {
    return new Promise<dbData>((resovle, reject) => {
      const newArray = [...array];
      let randomArray: any[] = [];
      for (let i = 0; i < lenght; i++) {
        const randomIndex = Math.floor(Math.random() * newArray.length);
        const selectedElement = newArray.splice(randomIndex, 1)[0];
        randomArray.push(selectedElement);
      }
      resovle(randomArray);
    });
  };
  useEffect(() => {
    setDatato();
  }, []);
  const Sound = async (data: dbData) => {
    const track = {
      url: `asset:/files/${data[count].Sound}`,
      title: data[count].Title,
      artist: 'eFlashApps',
      artwork: `asset:/files/${data[count].Sound}`,
      duration: 5,
    };
    await playerCopy([track]);
  };
  useEffect(() => {
    !backSound.normal ? setDatato() : null;
  }, [backSound]);
  const setDatato = async () => {
    let query: string;
    if (setting.RandomOrder == 1) {
      query =
        Category == 'AllIntOne'
          ? 'SELECT * FROM tbl_items ORDER BY RANDOM()'
          : Category != 'practice'
          ? `SELECT * FROM tbl_items WHERE category='${Category}' ORDER BY RANDOM()`
          : '';
    } else {
      query =
        Category == 'AllIntOne'
          ? 'SELECT * FROM tbl_items ORDER BY title ASC'
          : Category != 'practice'
          ? `SELECT * FROM tbl_items WHERE Category = '${Category}' ORDER BY title ASC`
          : '';
    }
    const datas: dbData = await db(
      Category == 'practice' ? '' : 'tbl_items',
      query,
    );
    const validdata = Category == 'practice' ? addedPractice : datas;
    setData(validdata);
    setting.Voice ? Sound(validdata) : null;
  };
  const practiceData = async () => {
    try {
      let practice: dbData = [];
      if (Category == 'practice') {
        if (setting.RandomOrder == 1) {
          practice = await radnomAray(addedPractice, addedPractice.length);
        } else {
          practice = addedPractice;
        }
        setData(practice);
        setting.Voice == 1 ? Sound(practice) : null;
      }
    } catch (err) {
      setData([]);
    }
  };
  useEffect(() => {
    practiceData();
  }, [addedPractice]);
  useEffect(() => {
    const back = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.reset({index: 0, routes: [{name: 'home'}]});
      return true;
    });
    return () => back.remove();
  }, [navigation]);

  const translateX = useSharedValue(0);
  const {width} = Dimensions.get('window');
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const handleSlide = async (nextIndex: number) => {
    const track = {
      url: 'asset:/files/soundclick.mp3',
      title: 'soundclick',
      artist: 'eFlashApps',
      artwork: 'asset:/files/soundclick.mp3',
      duration: 5,
    };
    const track2 = {
      url: `asset:/files/${data[nextIndex].Sound}`,
      title: data[nextIndex].Title,
      artist: 'eFlashApps',
      artwork: `asset:/files/${data[nextIndex].Sound}`,
      duration: 5,
    };

    await playerCopy([track]);

    const targetTranslateX = width;
    const direction = count < nextIndex ? 1 : -1;

    translateX.value = withTiming(targetTranslateX * direction, {
      duration: 0,
      easing: Easing.linear,
    });
    if (count % 10 == 0) {
      !IAP?.hasPurchased && showAdd();
    }

    setTimeout(async () => {
      translateX.value = withTiming(0, {
        duration: 200,
        easing: Easing.linear,
      });
      setting.Voice ? await playerCopy([track2]) : null;
    }, 300);

    setCount(nextIndex);
  };

  const setForPractice = async (item: dbItem) => {
    const practiceItems: dbData = [...addedPractice];

    const isItemPresent = practiceItems.some(
      practiceItem => practiceItem['_id'] === item['_id'],
    );

    let updatedItems: dbData;

    if (isItemPresent) {
      updatedItems = practiceItems.filter(
        practiceItem => practiceItem['_id'] !== item['_id'],
      );
    } else {
      updatedItems = [...practiceItems, item];
    }

    await AsyncStorage.setItem('practice', JSON.stringify(updatedItems));

    setAddPractice(updatedItems);
  };

  const getRed = () => {
    return addedPractice.some(item => item?.['_id'] === data[count]?.['_id']);
  };
  const handleonModal = (visible: boolean) => {
    setIsvisible(visible);
  };
  const handleSwipe = (num: number) => {
    if (setting.Swipe == 1) {
      if (data.length != 0) {
        handleSlide(num);
      }
    }
  };
  console.log(addedPractice);

  return (
    <GestureRecognizer
      style={{flex: 1}}
      onSwipeLeft={() => {
        handleSwipe(count + 1);
      }}
      onSwipeRight={() => {
        handleSwipe(count - 1);
      }}
      aria-disabled={setting.Swipe != 1 ? false : true}>
      <View style={styles.container}>
        <MyModal
          isVisible={isVisible}
          onPress={handleonModal}
          txt="Pratice again list for difficult words. Add words to list from
              Word by making them Red!"
          onPressLinking={ths => {
            console.log('thidid');
          }}
          ishome={false}
        />
        <Header
          isMuted={false}
          onLeftPress={() => {
            navigation.reset({index: 0, routes: [{name: 'home'}]});
          }}
          onRightPress={() => {
            dispatch(getBackSound({normal: true, question: false}));
            navigation.navigate('setting', {page: 'prrr'});
          }}
          onCenterPress={() => {
            if (data.length > 0) {
              setForPractice(data[count]);
            } else {
              Alert.alert('There is no words to add into practice');
            }
          }}
          details
          isAddeToPractice={getRed()}
          page="lern"
          isQuestion={false}
        />
        <View
          style={[
            {zIndex: -1},
            styles.container2,
            {
              height: IAP?.hasPurchased
                ? setting.Swipe == 1
                  ? hp(92)
                  : hp(85)
                : setting.Swipe == 1
                ? hp(85)
                : hp(75),
            },
          ]}>
          <AnimatedFlatlist
            data={data}
            scrollEnabled={false}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={count}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            renderItem={({item, index}) => {
              return (
                <Animated.View
                  style={[
                    styles.container2,
                    setting.Swipe == 1 && {height: hp(85)},
                    {
                      height: IAP?.hasPurchased
                        ? setting.Swipe == 1
                          ? hp(92)
                          : hp(85)
                        : setting.Swipe == 1
                        ? hp(85)
                        : hp(75),
                    },
                    animatedStyle,
                  ]}>
                  <ImageBackground
                    source={
                      Category == 'Kinder'
                        ? require('../../assets/images/kinder.jpg')
                        : Category == 'GradeOne'
                        ? require('../../assets/images/gradeone.jpg')
                        : Category == 'GradeTwo'
                        ? require('../../assets/images/gradetwo.jpg')
                        : Category == 'AllIntOne'
                        ? require('../../assets/images/all_in_one.jpg')
                        : require('../../assets/images/primary.png') //primary
                    }
                    style={[
                      styles.container2,
                      {
                        height: IAP?.hasPurchased
                          ? setting.Swipe == 1
                            ? hp(92)
                            : hp(85)
                          : setting.Swipe == 1
                          ? hp(85)
                          : hp(75),
                      },
                    ]}
                    resizeMode="stretch">
                    <Text
                      style={[
                        styles.txt,
                        Category == 'GradeTwo' ? {marginTop: '25%'} : undefined,
                      ]}>
                      {data[count]?.Title}
                    </Text>
                  </ImageBackground>
                </Animated.View>
              );
            }}
          />
        </View>
        {setting.Swipe != 1 ? (
          <View style={styles.btnContainer}>
            <TouchableOpacity
              disabled={count === 0}
              onPress={() => handleSlide(count - 1)}
              style={styles.touchable}>
              <Image
                style={styles.btn}
                resizeMode="contain"
                source={require('../../assets/images/previous.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Sound(data);
              }}
              style={styles.touchable}>
              <Image
                style={styles.btn}
                resizeMode="contain"
                source={require('../../assets/images/repeat.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={
                data.length == 0
                  ? true
                  : count == data.length - 1
                  ? true
                  : false
              }
              onPress={() => handleSlide(count + 1)}
              style={styles.touchable}>
              <Image
                style={styles.btn}
                resizeMode="contain"
                source={require('../../assets/images/nextt.png')}
              />
            </TouchableOpacity>
          </View>
        ) : null}
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
    </GestureRecognizer>
  );
};

export default PrePrimary;
