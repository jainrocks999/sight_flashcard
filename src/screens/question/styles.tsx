import {StyleSheet} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../utils/ResponsiveScreen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container2: {
    height: hp(82),
    width: wp(100),
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
    fontSize: wp(5),
    fontWeight: 'bold',
    color: 'black',
  },
  questionItem: {
    height: hp(37),
    width: wp(46),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(1),
    marginHorizontal: wp(2),
  },
  questionQontainer: {
    height: '100%',
    width: '100%',
    paddingTop: '9%',
  },
});
