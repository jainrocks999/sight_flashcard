import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Navigation from './components/navigation';
import {Provider} from 'react-redux';
import {sightStore} from './redux';

const Root = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={sightStore}>
        <Navigation />
      </Provider>
    </SafeAreaView>
  );
};

export default Root;
