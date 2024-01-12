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
  isHard: boolean;
  disabled: boolean;
  onLeftPress: () => void;
  onRightPress: () => void;
  onCenterPress: () => void;
  isMuted: boolean;
  isRightDisabled: boolean;
};

const Header: React.FC<props> = ({
  page,
  onLeftPress,
  onRightPress,
  onCenterPress,
  isHard,
  disabled,
  isMuted,
  isRightDisabled,
}) => {
  const grade = useSelector((state: rootState) => state.data.grade) as
    | 'tblWord'
    | 'tblWordG2'
    | string;
  return (
    <View style={[styles.container, {paddingTop: hp(3)}]}>
      <TouchableOpacity onPress={onLeftPress} style={styles.headerItem}>
        <Image
          style={styles.icon}
          source={
            page == 'find'
              ? require('../../asset/images/settings.png')
              : page == 'bingo'
              ? require('../../asset/images/settings.png')
              : isMuted
              ? require('../../asset/images/musicon.png')
              : require('../../asset/images/musicoff.png')
          }
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onCenterPress}
        disabled={disabled}
        style={styles.headerItem}>
        <Image
          style={[page == 'bingo' ? styles.reapeate : styles.title]}
          source={
            page == 'bingo'
              ? require('../../asset/images/repeatbingo.png')
              : grade == 'tblWord'
              ? require('../../asset/images/nprimary.png') //npreprimary
              : require('../../asset/images/npreprimary.png')
          }
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={isRightDisabled}
        onPress={onRightPress}
        style={styles.headerItem}>
        <Image
          style={[
            styles.icon,
            {marginRight: wp(2)},
            page == 'find'
              ? {height: hp(5), width: wp(18)}
              : page == 'bingo'
              ? {
                  height: hp(8),
                  width: hp(8),
                }
              : null,
          ]}
          source={
            page == 'find'
              ? !isHard
                ? require('../../asset/images/easy.png')
                : require('../../asset/images/hard.png')
              : page == 'bingo'
              ? require('../../asset/images/hmbtnbingo.png')
              : require('../../asset/images/settings.png')
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
    paddingHorizontal: wp(2),
    paddingTop: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerItem: {
    justifyContent: 'center',
    height: hp(6),
  },
  icon: {
    height: '100%',
    width: hp(6),
    alignSelf: 'flex-start',
  },
  title: {
    height: hp(5),
    width: wp(45),
  },

  reapeate: {
    height: hp(9),
    width: hp(9),
  },
});
