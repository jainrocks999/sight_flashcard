import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../utils/ResponsiveScreen';
const { width, height } = Dimensions.get("window");
const aspectRatio = height / width;
const IsIPAD = aspectRatio < 1.6;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container2: {
    height:hp(75),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    backgroundColor: 'grey',
    height: hp(5),
    marginTop:IsIPAD?0:hp(-5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
  touchable: {
    height: hp(4),
    width: wp(28),
  },
  btn: {
    height: '100%',
    width: '100%',
  },
  txt: {
    fontSize: wp(10),
    fontWeight: '800',
    color: 'black',
  },
});
