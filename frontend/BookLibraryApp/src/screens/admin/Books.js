import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Button,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header, Item, Input} from 'native-base';
import bookListApi from '../../api/bookListApi';
import deleteBookApi from '../../api/deleteBookApi';
// import ActivityIndicator from 'react-native-paper';
import ListItem from './ListItem';

var {height, width} = Dimensions.get('window');

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight: '600'}}>Title</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight: '600'}}>ISBN</Text>
      </View>
      {/* <View style={styles.headerItem}>
        <Text style={{fontWeight: '600'}}>Count</Text>
      </View> */}
    </View>
  );
};

const Books = props => {
  const [bookList, setBookList] = useState();
  const [bookFilter, setBookFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('jwt')
        .then(res => setToken(res))
        .catch(err => console.log(err));

      bookListApi
        .get('/books')
        .then(response => {
          setBookList(response.data);
          setBookFilter(response.data);
          setLoading(false);
        })
        .catch(err => console.log(err));

      return () => {
        setBookList();
        setBookFilter();
        setLoading(true);
      };
    }, []),
  );

  const searchProduct = text => {
    // if no text is entered into the search bar, display all books
    if (text === '') {
      setBookFilter(bookList);
    }
    // else display the book when a title is entered
    setBookFilter(
      bookList.filter(item =>
        item.title.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const deleteBook = id => {
    // console.log(id);
    // console.log(token);
    deleteBookApi
      .delete(`books/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log(res);
        const books = bookFilter.filter(item => item._id !== id);
        // console.log(books);
        setBookFilter(books);
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Book"
          color="#00CCCC"
          onPress={() => props.navigation.navigate('BookForm')}
        />
        {/* <Button
          title="Issues/Returns"
          color="#00CCCC"
          onPress={() => props.navigation.navigate('IssuesAdmin')}
        /> */}
      </View>
      <View>
        <Header
          searchBar
          rounded
          style={{backgroundColor: '#FFFF'}}
          androidStatusBarColor="#00CCCC">
          <Item style={{padding: 5}}>
            <Icon name="search" />
            <Input
              placeholder="Search"
              onChangeText={text => searchProduct(text)}
            />
          </Item>
        </Header>
      </View>
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          data={bookFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({item, index}) => (
            <ListItem
              item={item}
              navigation={props.navigation}
              index={index}
              delete={deleteBook}
            />
          )}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gainsboro',
    justifyContent: 'space-between',
  },
  headerItem: {
    margin: 3,
    width: width / 4,
  },
  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginBottom: 160,
    backgroundColor: 'white',
  },
  buttonContainer: {
    margin: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
});

export default Books;
