import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import UserStack from './UserStack';
import UserProfile from '../screens/UserProfile';

import Issues from '../screens/admin/Issues';
import IssuesScreen from '../screens/IssuesScreens';
import BookDetailScreen from '../screens/BookDetailScreen';

import Books from '../screens/admin/Books';
import BookForm from '../screens/admin/BookForm';

const Stack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#00CCCC',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="User"
          component={UserStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BooksAdmin"
          component={Books}
          options={{headerLeft: null, headerShown: false}}
        />
        <Stack.Screen name="BookDetails" component={BookDetailScreen} />

        <Stack.Screen name="Issues" component={IssuesScreen} />
        <Stack.Screen
          name="AdminUser"
          component={UserProfile}
          options={{title: 'Admin Profile'}}
        />
        <Stack.Screen name="BookForm" component={BookForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AdminNavigator;
