import React, {useContext, useState, useCallback, useEffect} from 'react';
import {View, Text, ScrollView, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useFocusEffect} from '@react-navigation/native';

import AuthGlobal from '../Context/store/AuthGlobal';
import {logoutUser} from '../Context/actions/AuthActions';
import userProfileApi from '../api/userProfileApi';

const UserProfile = ({navigation}) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      navigation.navigate('Login');
    }
    // console.log(context.stateUser.user.userId);
    AsyncStorage.getItem('jwt')
      .then(res => {
        userProfileApi
          .get(`/${context.stateUser.user.userId}`, {
            headers: {Authorization: `Bearer ${res}`},
          })
          .then(response => {
            console.log(response.data.name);
            setUserProfile(response.data);
            // Set the user name in Async Storage
            AsyncStorage.setItem('user', response.data.id);
          });
      })
      .catch(error => console.log(error));

    return () => {
      setUserProfile('');
    };
  }, [context.stateUser.isAuthenticated]);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30}}>
        {userProfile ? userProfile.name : 'No name'}
      </Text>
      <View style={{marginTop: 20}}>
        <Text style={{margin: 10}}>
          Email: {userProfile ? userProfile.email : ''}
        </Text>
      </View>
      <View style={{marginTop: 80}}>
        <Button
          title={'Sign Out'}
          onPress={() => [
            AsyncStorage.removeItem('jwt'),
            logoutUser(context.dispatch),
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
});

export default UserProfile;
