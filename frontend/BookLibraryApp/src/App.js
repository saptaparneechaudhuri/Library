/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import HomeStack from './navigation/HomeStack';
import MainNavigation from './navigation/MainNavigation';

import Toast from 'react-native-toast-message';
// import {Provider} from 'react-redux';

import AuthGlobal from './Context/store/AuthGlobal';

// Context API
import Auth from './Context/store/Auth';

const App = () => {
  const context = useContext(AuthGlobal);

  return (
    <Auth>
      <StatusBar backgroundColor="#00CCCC" />
      <MainNavigation />
      {/* <HomeStack /> */}
      <Toast ref={ref => Toast.setRef(ref)} />
    </Auth>
  );
};
export default App;
