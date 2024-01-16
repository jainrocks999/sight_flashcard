import {SafeAreaView, LogBox, StatusBar} from 'react-native';
import React from 'react';
import Navigation from './components/navigation';
import {Provider} from 'react-redux';
import {sightStore} from './redux';

const Root = () => {
  LogBox.ignoreAllLogs();
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#3668a3" />
      <Provider store={sightStore}>
        <Navigation />
      </Provider>
    </SafeAreaView>
  );
};

export default Root;
