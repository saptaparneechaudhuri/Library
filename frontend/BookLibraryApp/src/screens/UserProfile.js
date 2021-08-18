import React, {useContext, useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useFocusEffect} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';

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
  const [isLoading, setIsLoading] = useState(true);

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
              setIsLoading(false);
            });
        })
        .catch(error => console.log(error));

      return () => {
        setUserProfile('');
        setUserBooks([]);
        // setTokens(0);
        setIsLoading(true);
      };
    }, [context.stateUser.isAuthenticated]),
  );

  // PUT request to update the library_tokens in the datsbase

  useEffect(() => {
    userProfileApi
      .put(
        `/${context.stateUser.user.userId}`,
        {
          library_tokens: tokens,
        },
        {
          headers: {Authorization: `Bearer ${jwtToken}`},
        },
      )
      .then(response => {
        // console.log(response.data);
        console.log('tokens', tokens);
      })
      .catch(error => {
        console.log(error);
      });
  }, [tokens]);

  const returnBooks = id => {
    // increment library tokens on return
    setTokens(tokens + 1);
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
        {context.stateUser.user.isAdmin === true ? null : (
          <View style={{marginTop: 20}}>
            <Text style={{margin: 10}}>
              Library Tokens Left: {userProfile ? tokens : ''}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => [
            AsyncStorage.removeItem('jwt'),
            logoutUser(context.dispatch),
          ]}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>

        {/* <View style={{marginTop: 10}}>
          <Button
            title={'Sign Out'}
            onPress={() => [
              AsyncStorage.removeItem('jwt'),
              logoutUser(context.dispatch),
            ]}
          />
        </View> */}
      </View>
      {context.stateUser.user.isAdmin === true ? null : (
        <View style={{marginTop: 40}}>
          <Text style={{margin: 10, fontSize: 20}}>My Shelf</Text>
        </View>
      )}

      <View style={styles.subContainer}>
        {isLoading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <ScrollView>
            {userBooks.map(item => {
              // console.log(item._id);
              return (
                <View style={styles.imageContainer} key={item._id}>
                  <View>
                    <Image
                      source={{uri: item.image}}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{marginHorizontal: 5, marginTop: 5}}>
                    <Text numberOfLines={2}>bookId: {item.id}</Text>

                    <Text>Issued On: {item.issueDateFormat}</Text>
                    <Text>Return Due By: {item.returnDateFormat}</Text>
                    {/* <Text>Status: {item.status}</Text> */}

                    <View style={{width: '80%', marginTop: 10}}>
                      <Button
                        title="Return"
                        color="#00CCCC"
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
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    height: 200,
  },
  subContainer: {
    flex: 3,
    // flexDirection: 'row',
    alignSelf: 'center',
    // justifyContent: 'space-between',
    margin: 5,
    width: '100%',
    // borderWidth: 1,
    padding: 5,
    height: '100%',
    // position: 'relative',
  },
  image: {
    height: 100,
    width: 100,
    // borderWidth: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 5,
    margin: 5,
  },
  buttonContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ffff',
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#00CCCC',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default UserProfile;
