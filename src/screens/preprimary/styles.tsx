import {StyleSheet} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../utils/ResponsiveScreen';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    height: hp(82),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    backgroundColor: 'grey',
    height: hp(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
  touchable: {
    height: hp(6),
    width: wp(28),
  },
  btn: {
    height: '100%',
    width: '100%',
  },
  txt: {
    fontSize: wp(10),
    fontWeight: '500',
    color: 'black',
  },
});
