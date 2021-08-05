import React, {useState, useEffect} from 'react';
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
import Toast from 'react-native-toast-message';

const DetailItem = props => {
  return (
    <View style={styles.detailItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const BookDetailScreen = ({route, navigation}) => {
  const {item} = route.params;
  const [count, setCount] = useState(0);

  const lendBook = book => {
    // Add book to the IssueReturn collection in the database
    // if count <= book.count
    console.log(count, book.count);
    if (count <= book.count) {
      issuesApi
        .post('/bookissue', {
          booksIssued: book._id,

          image: book.image,
          user: '6109002a5bb3642734135ebd',
        })
        .then(response => {
          if (response.status === 200) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: `${book.title} Issued`,
              text2: 'Please visit issues screen',
            });

            setTimeout(() => {
              navigation.navigate('BooksScreen');
            }, 500);
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
      setCount(prevCount => prevCount + 1);
    } else {
      console.log('Book Unavailable');
    }
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
        onPress={() => lendBook(item)}>
        <Text style={styles.buttonText}>Lend</Text>
      </TouchableOpacity>
      <View style={{borderWidth: 1, marginTop: 15}}>
        <DetailItem>Title: {item.title}</DetailItem>
        <DetailItem>Count: {item.count}</DetailItem>
        <DetailItem>Authors: {item.authors.map(author => author)}</DetailItem>
        {/* <DetailItem>BookUIDs: {bookDetail.bookUID.map(uid => uid)}</DetailItem> */}
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
