import {StyleSheet} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../utils/ResponsiveScreen';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  catagoryContainer: {
    paddingHorizontal: wp(5),
    paddingVertical: wp(3),
    marginTop: hp(6),
    alignItems: 'center',
  },
  prekinderContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  imgBtn: {
    height: hp(20),
    width: wp(40),
  },
  allinone: {
    width: '100%',
    height: hp(6),
  },
  practicemore: {
    flexDirection: 'row',
    width: '50%',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    marginTop: hp(4),
  },
  secondBtn: {
    height: hp(9),
    width: '47%',
  },
});
