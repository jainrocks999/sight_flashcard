import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Image} from 'react-native-animatable';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../utils/ResponsiveScreen';

type Props = {
  title: string;
  onPress: (name: string, value: number) => void;
  isSelected: number;
  name: string;
};
const Check: React.FC<Props> = ({isSelected, name, ...props}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.onPress(name, isSelected == 1 ? 0 : 1)}
        style={styles.box}>
        {isSelected == 1 ? (
          <Image
            style={{
              height: hp(4.5),
              width: hp(4.5),
              position: 'absolute',
              right: '-30%',
              top: '-20%',
            }}
            source={require('../../assets/images/check.png')}
            tintColor={'green'}
          />
        ) : null}
      </TouchableOpacity>
      <View style={styles.txtContainer}>
        <Text style={styles.txt}>{props.title}</Text>
      </View>
    </View>
  );
};

export default Check;
const styles = StyleSheet.create({
  container: {
    height: '20%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '10%',
  },
  box: {
    height: hp(3.5),
    width: hp(3.5),
    borderWidth: wp(0.5),
    borderColor: 'black',
  },
  txt: {
    color: 'black',
    fontSize: wp(7),
    fontWeight: '500',
    textAlign: 'left',
  },
  txtContainer: {
    width: '80%',
  },
});
