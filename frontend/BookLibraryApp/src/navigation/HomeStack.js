import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import BooksScreen from '../screens/BooksScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import TabsStack from './TabsStack';
import UserStack from './UserStack';
import AdminNavigator from './AdminNavigator';

import AuthGlobal from '../Context/store/AuthGlobal';

const Stack = createStackNavigator();

const HomeStack = () => {
  const context = useContext(AuthGlobal);

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
          name="BooksScreen"
          component={TabsStack}
          options={{
            headerTitle: 'Library',
            headerLeft: () => null,
          }}
        />
        <Stack.Screen name="BookDetails" component={BookDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default HomeStack;
