/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import HomeStack from './navigation/HomeStack';
import Toast from 'react-native-toast-message';

// Context API
// import Auth from './Context/store/Auth';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#00CCCC" />
      <HomeStack />
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};
export default App;
