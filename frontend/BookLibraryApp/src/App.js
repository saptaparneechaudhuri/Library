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

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#00CCCC" />
      <HomeStack />
    </>
  );
};
export default App;
