import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Issues from '../screens/admin/Issues';
import Books from '../screens/admin/Books';
import BookForm from '../screens/admin/BookForm';

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BooksAdmin"
        component={Books}
        options={{headerLeft: null, headerShown: false}}
      />
      <Stack.Screen
        name="IssuesAdmin"
        component={Issues}
        options={{title: 'Issues/Return'}}
      />
      <Stack.Screen name="BookForm" component={BookForm} />
    </Stack.Navigator>
  );
};

export default AdminStack;
