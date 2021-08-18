import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BooksScreen from '../screens/BooksScreen';
import IssuesScreen from '../screens/IssuesScreens';
import UserProfile from '../screens/UserProfile';
import AdminStack from './AdminStack';
import AuthGlobal from '../Context/store/AuthGlobal';

const Tab = createMaterialTopTabNavigator();

// Create a stack for issues and add it as a second screen for tabs

const TabsStack = () => {
  const context = useContext(AuthGlobal);

  return (
    // <NavigationContainer>
    <Tab.Navigator
      tabBarOptions={{
        style: {backgroundColor: '#00CCCC'},
        activeTintColor: '#ffff',
        labelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },

        indicatorStyle: {backgroundColor: '#ffff'},
      }}>
      <Tab.Screen name="Books" component={BooksScreen} />
      {/* <Tab.Screen name="Issues" component={IssuesScreen} /> */}
      <Tab.Screen name="User" component={UserProfile} />
      {/* {context.stateUser.user.isAdmin === true ? (
        <Tab.Screen name="Admin" component={AdminStack} />
      ) : null} */}
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default TabsStack;
