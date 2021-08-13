import React, {useContext, useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useFocusEffect} from '@react-navigation/native';

import AuthGlobal from '../Context/store/AuthGlobal';
import {logoutUser} from '../Context/actions/AuthActions';
import userProfileApi from '../api/userProfileApi';
import getBooksByUserApi from '../api/getBooksByUserApi';
import removeBookIssuedByUserApi from '../api/removeBookIssuedByUserApi';
var {width} = Dimensions.get('window');

// TODO: Set key prop to Scrollview, use usefocus effect

const UserProfile = ({navigation}) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [userBooks, setUserBooks] = useState([]);
  const [tokens, setTokens] = useState();
  const [jwtToken, setJwtToken] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        navigation.navigate('Login');
      }
      // console.log(context.stateUser.user.userId);
      AsyncStorage.getItem('jwt')
        .then(res => {
          setJwtToken(res);
          userProfileApi
            .get(`/${context.stateUser.user.userId}`, {
              headers: {Authorization: `Bearer ${res}`},
            })
            .then(response => {
              // console.log(response.data.name);
              setUserProfile(response.data);
              setTokens(response.data.library_tokens);
              // Set the user id in Async Storage
              AsyncStorage.setItem('user', response.data.id);
            });
          // Get all books issued by a user
          getBooksByUserApi
            .get(`/${context.stateUser.user.userId}`, {
              headers: {Authorization: `Bearer ${res}`},
            })
            .then(response => {
              setUserBooks(response.data);
            });
        })
        .catch(error => console.log(error));

      return () => {
        setUserProfile('');
        setUserBooks([]);
      };
    }, [context.stateUser.isAuthenticated]),
  );

  const returnBooks = id => {
    removeBookIssuedByUserApi
      .delete(`/${id}`, {
        headers: {Authorization: `Bearer ${jwtToken}`},
      })
      .then(response => {
        const books = userBooks.filter(item => item._id !== id);
        // console.log(books);
        setUserBooks(books);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={{fontSize: 30}}>
          {userProfile ? userProfile.name : 'No name'}
        </Text>
        <View style={{marginTop: 20}}>
          <Text style={{margin: 10}}>
            Email: {userProfile ? userProfile.email : ''}
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{margin: 10}}>
            Library Tokens: {userProfile ? tokens : ''}
          </Text>
        </View>

        <View style={{marginTop: 10}}>
          <Button
            title={'Sign Out'}
            onPress={() => [
              AsyncStorage.removeItem('jwt'),
              logoutUser(context.dispatch),
            ]}
          />
        </View>
      </View>
      <View style={{marginTop: 80}}>
        <Text style={{margin: 10, fontSize: 20}}>My Shelf</Text>
      </View>
      <ScrollView>
        {userBooks.map(item => {
          console.log(item._id);
          return (
            <View style={styles.imageContainer}>
              <Image
                source={{uri: item.image}}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={{marginHorizontal: 5, marginTop: 5}}>
                <Text numberOfLines={2}>bookId: {item.id}</Text>

                <Text>Issued On: {item.issueDateFormat}</Text>
                <Text>Return Due By: {item.returnDateFormat}</Text>
                <Text>Status: {item.status}</Text>
                <View style={{width: '80%'}}>
                  <Button
                    title="Return"
                    onPress={() => {
                      // on return increment token and remove from shelf TODO
                      // remove book from issues
                      returnBooks(item._id);
                    }}
                  />
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
  },
  subContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    width: '90%',
    // borderWidth: 1,
    padding: 10,
  },
  image: {
    height: 150,
    width: 100,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    padding: 5,
    marginBottom: 5,
  },
});

export default UserProfile;
