import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../utils/ResponsiveScreen';

type Props = {
  isVisible: boolean;
  onPress: (txt: boolean) => void;
  txt: string;
  ishome: boolean;
  onPressLinking: (txt: boolean) => void;
};
const MyModal: React.FC<Props> = ({
  isVisible,
  onPress,
  txt,
  ishome,
  onPressLinking,
}) => {
  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.blackContainer}>
            <Text style={styles.txt}>{txt}</Text>
          </View>
          {!ishome ? (
            <TouchableOpacity
              onPress={() => onPress(!isVisible)}
              style={styles.btn}>
              <Text style={styles.btnText}>OK</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                height: '30%',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: '2%',
              }}>
              <TouchableOpacity
                onPress={() => onPressLinking(!isVisible)}
                style={styles.btn2}>
                <Text style={styles.btnText}>More Apps</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onPress(!isVisible)}
                style={styles.btn2}>
                <Text style={styles.btnText}>No, Thanks</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default MyModal;
const styles = StyleSheet.create({
  modal: {
    height: hp(30),
    width: wp(90),
    backgroundColor: '#c6cccc',
    elevation: 5,
  },
  blackContainer: {
    backgroundColor: 'black',
    height: '75%',
    width: '99%',
    alignSelf: 'center',
    marginTop: '1%',
    elevation: 5,
    paddingHorizontal: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: 'white',
    fontSize: wp(5),
    textAlign: 'center',
    fontWeight: '500',
  },
  btn: {
    height: '20%',
    width: '50%',
    backgroundColor: 'white',
    alignSelf: 'center',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1%',
  },
  btn2: {
    height: '60%',
    width: '45%',
    backgroundColor: 'white',
    alignSelf: 'center',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  btnText: {
    fontSize: wp(4.5),
    color: 'black',
    fontWeight: '400',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
