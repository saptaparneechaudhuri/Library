import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import issuesApi from '../api/issuesApi';
import bookDetailsApi from '../api/bookDetailsApi';
import userProfileApi from '../api/userProfileApi';
import AuthGlobal from '../Context/store/AuthGlobal';

import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const DetailItem = props => {
  return (
    <View style={styles.detailItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const BookDetailScreen = ({route, navigation}) => {
  const {item} = route.params;
  const context = useContext(AuthGlobal);

  const [tokens, setTokens] = useState();
  const [jwtToken, setJwtToken] = useState();

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
        setJwtToken(res);
        userProfileApi
          .get(`/${context.stateUser.user.userId}`, {
            headers: {Authorization: `Bearer ${res}`},
          })
          .then(response => {
            // console.log(response.data);
            setTokens(response.data.library_tokens);

            // Set the user id in Async Storage
            AsyncStorage.setItem('user', response.data.id);
          })
          .catch(err => console.log(err));
      })
      .catch(error => console.log(error));
    return () => {
      // setTokens(0);
    };
  }, [context.stateUser.isAuthenticated]);

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

  const lendBook = book => {
    if (tokens <= 0) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: `Not Enough Tokens`,
        text2: 'Please return a book',
      });
      setTokens(0);
      return;
    } else {
      setTokens(tokens - 1);
    }

    // Add book to the IssueReturn collection in the database

    issuesApi
      .post('/bookissue', {
        booksIssued: book._id,

        image: book.image,
        user: context.stateUser.user.userId,
      })
      .then(response => {
        if (response.status === 200) {
          // Decrement user's library token
          // setTokens(tokens - 1);
          // console.log(tokens);
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: `${book.title} Issued`,
            text2: 'Please visit issues screen',
          });

          // setTimeout(() => {
          //   navigation.navigate('BooksScreen');
          // }, 500);
        }
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Book Issue Failed',
          text2: 'Something went wrong',
        });
      });
  };

  // console.log(item);

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{uri: item.image}}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          setTokens(tokens - 1);
          lendBook(item);
        }}>
        <Text style={styles.buttonText}>Issue</Text>
      </TouchableOpacity>
      <View style={{borderWidth: 1, marginTop: 15}}>
        <DetailItem>Title: {item.title}</DetailItem>
        {/* <DetailItem>Count: {item.count}</DetailItem> */}
        <DetailItem>Authors: {item.authors.map(author => author)}</DetailItem>
        {/* <Text>{tokens}</Text> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    flex: 1,
  },
  imageContainer: {
    height: '100%',
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    alignSelf: 'center',
  },
  image: {
    height: 300,
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
  },
  descriptionContainer: {
    marginTop: 50,

    borderWidth: 1,
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
  detailItem: {
    marginHorizontal: 20,
    padding: 10,
    borderColor: '#ccc',

    alignItems: 'flex-start',
  },
});

export default BookDetailScreen;
