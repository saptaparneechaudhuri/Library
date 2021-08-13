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
// import {Provider} from 'react-redux';

// Context API
import Auth from './Context/store/Auth';

const App = () => {
  return (
    <Auth>
      <StatusBar backgroundColor="#00CCCC" />
      <HomeStack />
      <Toast ref={ref => Toast.setRef(ref)} />
    </Auth>
  );
};
export default App;
