import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StackNavigationParams} from '../../components/navigation';
import {Image} from 'react-native-animatable';
import db from '../../utils/db';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Props = StackScreenProps<StackNavigationParams, 'splash'>;
const Splash: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    getData();
    const timeout = setTimeout(() => {
      navigation.reset({index: 0, routes: [{name: 'home'}]});
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  const dispatch = useDispatch();
  const getData = async () => {
    const data = await db('tbl_items', '');
    const setting = await db('tbl_settings', '');
    const setting2 = await AsyncStorage.getItem('setting');
    dispatch({
      type: 'sightCards/getDbData',
      payload: data,
    });
    dispatch({
      type: 'sightCards/getSettings',
      payload: setting2 != null ? JSON.parse(setting2) : setting[0],
    });
  };
  return (
    <View style={{flex: 1}}>
      <Image
        style={{height: '100%', width: '100%'}}
        source={require('../../assets/images/splash.png')}
      />
    </View>
  );
};

export default Splash;
