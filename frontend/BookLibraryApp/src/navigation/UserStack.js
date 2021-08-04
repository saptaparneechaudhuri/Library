import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/user/Login';
import Register from '../screens/user/Register';

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
