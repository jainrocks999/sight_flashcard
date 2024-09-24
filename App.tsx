import {View, Text,LogBox} from 'react-native';
import React, {Fragment} from 'react';
import Root from './src';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
const App = () => {
  return (
    <Fragment>
      <Root />
    </Fragment>
  );
};

export default App;
