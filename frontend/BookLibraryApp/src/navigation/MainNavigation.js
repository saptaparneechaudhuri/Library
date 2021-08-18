import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthGlobal from '../Context/store/AuthGlobal';
import HomeStack from './HomeStack';
import AdminNavigator from './AdminNavigator';

const MainNavigation = () => {
  const context = useContext(AuthGlobal);

  if (context.stateUser.user.isAdmin === true) {
    return <AdminNavigator />;
  } else {
    return <HomeStack />;
  }
};

export default MainNavigation;
