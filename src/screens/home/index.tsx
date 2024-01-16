import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StackNavigationParams} from '../../components/navigation';
import styles from './styles';
import Header from '../../components/header';
import {Image} from 'react-native-animatable';
type Props = StackScreenProps<StackNavigationParams, 'home'>;
const Home: React.FC<Props> = ({navigation}) => {
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
    </ImageBackground>
  );
};

export default Home;
