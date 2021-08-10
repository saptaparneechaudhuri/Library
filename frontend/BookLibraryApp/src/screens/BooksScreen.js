import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import bookListApi from '../api/bookListApi';
import ListItem from '../components/ListItem';
import {bookData} from '../data/bookInventory';
import bookDetailsApi from '../api/bookDetailsApi';
import {Header, Icon, Item, Input} from 'native-base';
import SearchedBook from './SearchedBook';

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
        // console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // TODO useFocuseffecet

  useEffect(() => {
    getBookList();
    // setBookList(bookData);

    setIsLoading(false);

    return () => {
      setBookList([]);
      setBooksFiltered([]);

      setIsLoading(true);
    };
  }, []);

  // const getBookDetails = id => {
  //   bookDetailsApi.get(`/${id}`).then(response => {
  //     // console.log(response.data);
  //     setBookDetail(response.data);
  //   });
  // };
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
          // getBookDetails(item._id);
          // console.log(bookDetail);
          navigation.navigate('BookDetails', {
            item: item,
          });
        }}
      />
    );
  };
  return (
    <View>
      <Header searchBar rounded style={{backgroundColor: '#FFFF'}}>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" onChangeText={text => searchBook(text)} />
        </Item>
      </Header>

      <FlatList
        numColumns={2}
        data={booksFiltered}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        onEndReachedThreshold={0.1}
      />

      {/* {isLoading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{marginTop: 60}}
        />
      ) : (
        <FlatList
          numColumns={2}
          data={bookList}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          onEndReachedThreshold={0.1}
        />
      )} */}
    </View>
  );
};

export default BooksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
