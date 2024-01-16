import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../utils/ResponsiveScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {rootState} from '../../redux';
type props = {
  page: string;
  onLeftPress: () => void;
  onRightPress: () => void;
  isMuted: boolean;
};

const Header: React.FC<props> = ({
  page,
  onLeftPress,
  onRightPress,
  isMuted,
}) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: page == 'lern' ? 'grey' : undefined},
      ]}>
      <TouchableOpacity
        onPress={onLeftPress}
        style={[
          styles.headerItem,
          page == 'lern' ? styles.roundHeaderItem : undefined,
        ]}>
        <Image
          style={[styles.icon, {height: hp(7), width: hp(7), marginTop: '30%'}]}
          source={
            page == 'lern'
              ? require('../../assets/images/home_btn.png')
              : require('../../assets/images/speakar57.png')
          }
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity disabled={true} style={styles.headerItem}>
        {/* <Image
          style={[page == 'bingo' ? styles.reapeate : styles.title]}
          source={
            page == 'bingo'
              ? require('../../asset/images/repeatbingo.png')
              : grade == 'tblWord'
              ? require('../../asset/images/nprimary.png') //npreprimary
              : require('../../asset/images/npreprimary.png')
          }
          resizeMode="contain"
        /> */}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onRightPress}
        style={[
          styles.headerItem,
          page == 'lern' ? styles.roundHeaderItem : undefined,
          {marginRight: '-3%'},
        ]}>
        <Image
          style={[styles.icon]}
          source={
            page == 'lern'
              ? require('../../assets/images/setting_icn.png')
              : require('../../assets/images/setting_icn.png')
          }
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(7),
  },
  headerItem: {
    justifyContent: 'center',
    height: hp(7),
  },
  icon: {
    height: hp(6.5),
    width: hp(6.5),
    // alignSelf: 'flex-start',
    marginTop: '20%',
  },
  title: {
    height: hp(5),
    width: wp(45),
  },

  reapeate: {
    height: hp(9),
    width: hp(9),
  },
  roundHeaderItem: {
    height: hp(11),
    width: hp(11),
    borderRadius: hp(5.5),
    backgroundColor: 'grey',
    alignItems: 'center',
    marginLeft: '-3%',
  },
});
