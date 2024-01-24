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
  details: boolean;
  isAddeToPractice: boolean;
  onCenterPress: () => void;
  isQuestion: boolean;
};

const Header: React.FC<props> = ({
  page,
  onLeftPress,
  onRightPress,
  isMuted,
  details,
  isAddeToPractice,
  onCenterPress,
  isQuestion,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: page == 'lern' ? 'grey' : undefined,
          paddingHorizontal: page != 'lern' ? wp(2) : undefined,
        },
      ]}>
      <TouchableOpacity
        onPress={onLeftPress}
        style={[
          styles.headerItem,
          page == 'lern' ? styles.roundHeaderItem : undefined,
        ]}>
        <Image
          style={[
            styles.icon,
            {height: hp(6.4), width: hp(6.5), marginTop: '30%'},
          ]}
          source={
            page == 'lern'
              ? require('../../assets/images/home_btn.png')
              : isMuted
              ? require('../../assets/images/speakar57.png')
              : require('../../assets/images/speakar58.png')
          }
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onCenterPress}
        disabled={!details}
        style={styles.headerItem}>
        {details ? (
          <Image
            style={[page == 'bingo' ? styles.reapeate : styles.title]}
            source={
              isQuestion
                ? require('../../assets/images/repeat.png')
                : isAddeToPractice
                ? require('../../assets/images/flag_re.png')
                : require('../../assets/images/flag.png')
            }
            resizeMode="contain"
          />
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onRightPress}
        style={[
          styles.headerItem,
          page == 'lern' ? styles.roundHeaderItem : undefined,
          page == 'lern'
            ? {marginRight: '-3%'}
            : {height: hp(10), width: 'auto'},
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
