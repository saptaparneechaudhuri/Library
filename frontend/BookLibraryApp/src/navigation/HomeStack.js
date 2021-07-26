import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import BooksScreen from '../screens/BooksScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import TabsStack from './TabsStack';

const Stack = createStackNavigator();

const HomeStack = () => {
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
          name="BooksScreen"
          component={TabsStack}
          options={{
            headerTitle: 'Library',
          }}
        />
        <Stack.Screen name="BookDetails" component={BookDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default HomeStack;
