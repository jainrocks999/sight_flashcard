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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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
import {setupPlayer} from '../../utils/Setup';
import playerCopy from '../../utils/player copy';
import {dbData} from '../../types';
import {BannerAdSize, GAMBannerAd} from 'react-native-google-mobile-ads';
import {rightVoice, wrongVoice} from '../../utils/RightWrongVoice';
import {getBackSound} from '../../redux/reducers';
import TrackPlayer from 'react-native-track-player';
import {heightPercent as hp} from '../../utils/ResponsiveScreen';
import showAdd, {addIds} from '../../utils/ads';
import {IAPContext} from '../../Context';

type Props = StackScreenProps<StackNavigationParams, 'question'>;
const AnimatedFlatlist = createAnimatableComponent(FlatList);

const Question: React.FC<Props> = ({navigation}) => {
  const IAP = useContext(IAPContext);
  const backSound = useSelector((state: rootState) => state.data.backSound);
  const dbdata = useSelector((state: rootState) => state.data.dbData);
  const Category = useSelector((state: rootState) => state.data.Catagory);
  const [data, setData] = useState<dbData>([]);
  const [rightAns, setRightAns] = useState<number>(-1);
  const [count, setCount] = useState(0);
  const translateX = useSharedValue(0);
  const {width} = Dimensions.get('window');
  const [worng, setWorng] = useState<number[]>([]);
  const [right, setRight] = useState<number[]>([]);
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
  const formatDatawithCat = async (dbData: dbData) => {
    const pr = await new Promise<dbData>(resovle => {
      let forMateWithCategory: dbData = [];
      if (Category != 'AllIntOne') {
        forMateWithCategory = dbData.filter(
          (item, index) => item.Category == Category,
        );
      } else {
        forMateWithCategory = dbData;
      }
      resovle(forMateWithCategory);
    });
    return pr;
  };
  const [randomData, setRandomData] = useState<dbData>([...dbdata.slice(0, 4)]);

  useEffect(() => {
    setTodata();
  }, [Category]);
  const [navi, setNavi] = useState(true);
  const setTodata = async () => {
    const forMateWithCategory = await formatDatawithCat([...dbdata]);
    const random = await radnomAray(forMateWithCategory, 4);
    setRandomData(random);
    setData(forMateWithCategory);
    if (navi) {
      const ind = await getIndex();
      askQuestion(random, ind);
      setNavi(false);
    }
  };
  useEffect(() => {
    !backSound.question ? askQuestion(randomData, rightAns) : null;
  }, [backSound]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });
  const getIndex = () => {
    return new Promise<number>(resolve => {
      const rightIndex = Math.floor(Math.random() * 3);
      setRightAns(rightIndex);
      resolve(rightIndex);
    });
  };

  const askQuestion = async (theData: dbData, rightIndex: number) => {
    const track = {
      url: 'asset:/files/clickon.mp3',
      title: 'soundclick',
      artist: 'eFlashApps',
      artwork: 'asset:/files/clickon.mp3',
      duration: 5,
    };
    const track2 = {
      url: `asset:/files/${theData[rightIndex].Sound}`,
      title: theData[rightIndex].Title,
      artist: 'eFlashApps',
      artwork: `asset:/files/${theData[rightIndex].Sound}`,
      duration: 5,
    };

    await playerCopy([track, track2]);
  };

  const praised = async (index: number) => {
    let traxck;
    let track2;
    traxck = wrongVoice.sort(() => Math.random() - 0.5)[1];
    track2 = rightVoice.sort(() => Math.random() - 0.5)[1];

    if (index === rightAns) {
      setRight([index]);
      const arr = [0, 1, 2, 3].filter(item => item != index);
      setWorng(arr);
      await playerCopy([track2]);
      setTimeout(async () => {
        setWorng([]);
        setRight([]);
        const shuffledData = await radnomAray([...dbdata], 4);
        const ind = await getIndex();
        setRandomData(shuffledData);
        askQuestion(shuffledData, ind);
        handleSlide(count);
        setCount(prev => prev + 1);
      }, 1500);
    } else {
      await playerCopy([traxck]);
      switch (index) {
        case 0:
          setWorng(prev => [...prev, 0]);
          break;
        case 1:
          setWorng(prev => [...prev, 1]);
          break;
        case 2:
          setWorng(prev => [...prev, 2]);
          break;
        case 3:
          setWorng(prev => [...prev, 3]);
          break;
      }
    }
  };

  const handleSlide = async (nextIndex: number) => {
    const targetTranslateX = -width;
    const direction = count < nextIndex ? 1 : -1;

    translateX.value = withTiming(targetTranslateX * direction, {
      duration: 0,
      easing: Easing.linear,
    });

    setTimeout(async () => {
      translateX.value = withTiming(0, {
        duration: 200,
        easing: Easing.linear,
      });
    }, 300);
    console.log('thssisisiisisissisi', count);

    if (count > 0 && count % 15 == 0) {
      !IAP?.hasPurchased && showAdd();
    }

    setCount(nextIndex);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const back = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.reset({index: 0, routes: [{name: 'home'}]});
      return true;
    });
    return () => back.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header
        isMuted={false}
        onLeftPress={() =>
          navigation.reset({index: 0, routes: [{name: 'home'}]})
        }
        onRightPress={async () => {
          await TrackPlayer.reset();
          dispatch(getBackSound({normal: false, question: true}));
          navigation.navigate('setting', {page: 'rtrt'});
        }}
        onCenterPress={() => {
          askQuestion(randomData, rightAns);
        }}
        details={true}
        isQuestion
        isAddeToPractice={false}
        page="lern"
      />
      <View style={{zIndex: -1, marginTop: hp(0.1)}}>
        <AnimatedFlatlist
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={count}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          scrollEnabled={false}
          renderItem={({item, index}) => {
            return (
              <Animated.View
                style={[
                  styles.container2,
                  {
                    height: IAP?.hasPurchased ? hp(92) : hp(82),
                  },
                  animatedStyle,
                ]}>
                <View style={[styles.questionQontainer, ,]}>
                  <FlatList
                    data={randomData}
                    numColumns={2}
                    keyExtractor={item => item._id.toString()}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        disabled={
                          worng.includes(index) || right.includes(index)
                        }
                        onPress={() => praised(index)}>
                        <ImageBackground
                          source={
                            Category == 'Kinder'
                              ? require('../../assets/images/kinder.jpg')
                              : Category == 'GradeOne'
                              ? require('../../assets/images/gradeone.jpg')
                              : Category == 'GradeTwo'
                              ? require('../../assets/images/gradetwo.jpg')
                              : Category == 'Primary'
                              ? require('../../assets/images/primary.png')
                              : require('../../assets/images/all_in_one.jpg')
                          }
                          style={[
                            styles.questionItem,
                            {height: IAP?.hasPurchased ? hp(40) : hp(37)},
                          ]}
                          resizeMode="stretch">
                          <Text
                            style={[
                              styles.txt,
                              Category == 'GradeTwo'
                                ? {marginTop: '25%'}
                                : undefined,
                            ]}>
                            {item.Title}
                          </Text>
                        </ImageBackground>
                        {worng.includes(index) ? (
                          <Image
                            source={require('../../assets/images/wrongselection.png')}
                            style={[
                              styles.questionItem,
                              {position: 'absolute'},
                              {height: IAP?.hasPurchased ? hp(40) : hp(37)},
                            ]}
                            resizeMode="stretch"
                          />
                        ) : null}
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </Animated.View>
            );
          }}
        />
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
    </View>
  );
};

export default Question;
