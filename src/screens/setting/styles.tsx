import {StyleSheet} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../utils/ResponsiveScreen';

export default StyleSheet.create({
  container: {
    height: '72%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(10),
  },
  settingBg: {
    height: hp(45),
    width: wp(80),
    alignItems: 'center',
    paddingTop: '15%',
  },
  btncontainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(9),
  },
  image: {
    height: '100%',
    width: '100%',
    opacity: 1,
  },
  btn: {
    height: '60%',
    width: '40%',
    zIndex: 1,
    opacity: 1,
  },
  soundBtn: {
    position: 'absolute',
    height: hp(8),
    width: hp(8),
    left: wp(3),
    top: hp(2),
    zIndex: 1,
  },
});
