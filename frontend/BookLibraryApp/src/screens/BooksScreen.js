import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import bookListApi from '../api/bookListApi';
import ListItem from '../components/ListItem';

import {Header, Icon, Item, Input} from 'native-base';

import {useFocusEffect} from '@react-navigation/native';
var {height, width} = Dimensions.get('window');

const BooksScreen = ({navigation}) => {
  const [bookList, setBookList] = useState([]);
  const [bookDetail, setBookDetail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [booksFiltered, setBooksFiltered] = useState([]);

  const getBookList = () => {
    bookListApi
      .get('/books')
      .then(response => {
        setBookList(response.data);
        setBooksFiltered(response.data);
        setIsLoading(false);
        // console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useFocusEffect(
    useCallback(() => {
      getBookList();

      return () => {
        setBookList([]);
        setBooksFiltered([]);

        setIsLoading(true);
      };
    }, []),
  );

  // Serach a book
  const searchBook = text => {
    // if no text is entered into the search bar, display all books
    if (text === '') {
      setBooksFiltered(bookList);
    }
    // else display the book when a title is entered
    setBooksFiltered(
      bookList.filter(i => i.title.toLowerCase().includes(text.toLowerCase())),
    );
  };

  const renderItem = ({item}) => {
    return (
      <ListItem
        item={item}
        onSelect={() => {
          navigation.navigate('BookDetails', {
            item: item,
          });
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Header
        searchBar
        rounded
        style={{backgroundColor: '#FFFF'}}
        androidStatusBarColor="#00CCCC">
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" onChangeText={text => searchBook(text)} />
        </Item>
      </Header>

      {isLoading === true ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          numColumns={2}
          data={booksFiltered}
          renderItem={renderItem}
          keyExtractor={item => item.title}
        />
      )}
    </View>
  );
};

export default BooksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
