import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
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

type Props = StackScreenProps<StackNavigationParams, 'preprimary'>;
const AnimatedFlatlist = createAnimatableComponent(FlatList);

const PrePrimary: React.FC<Props> = () => {
  const data = useSelector((state: rootState) => state.data.dbData);
  const [count, setCount] = useState(0);
  const translateX = useSharedValue(0);
  const {width} = Dimensions.get('window');
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });
  useEffect(() => {
    handleSlide(count);
  }, []);

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

    setTimeout(async () => {
      translateX.value = withTiming(0, {
        duration: 500,
        easing: Easing.linear,
      });
      await playerCopy([track2]);
    }, 500);

    setCount(nextIndex);
  };

  return (
    <View style={styles.container}>
      <Header
        isMuted={false}
        onLeftPress={() => console.log('something')}
        onRightPress={() => console.log('sonething')}
        page="lern"
      />
      <View style={{zIndex: -1}}>
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
          renderItem={({item, index}) => {
            return (
              <Animated.View style={[styles.container2, animatedStyle]}>
                <ImageBackground
                  source={require('../../assets/images/primary.png')}
                  style={styles.container2}
                  resizeMode="stretch">
                  <Text style={styles.txt}>{data[count].Title}</Text>
                </ImageBackground>
              </Animated.View>
            );
          }}
          //   onMomentumScrollEnd={event => {
          //     const nextIndex = Math.round(
          //       event.nativeEvent.contentOffset.x / width,
          //     );
          //     // handleSlide(nextIndex);
          //   }}
        />
      </View>
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
        <TouchableOpacity style={styles.touchable}>
          <Image
            style={styles.btn}
            resizeMode="contain"
            source={require('../../assets/images/repeat.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={count === data.length - 1 ? true : false}
          onPress={() => handleSlide(count + 1)}
          style={styles.touchable}>
          <Image
            style={styles.btn}
            resizeMode="contain"
            source={require('../../assets/images/nextt.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrePrimary;
