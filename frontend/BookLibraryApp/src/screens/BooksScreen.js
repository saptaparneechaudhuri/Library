import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import bookListApi from '../api/bookListApi';
import ListItem from '../components/ListItem';
import {bookData} from '../data/bookInventory';

const BooksScreen = ({navigation}) => {
  const [bookList, setBookList] = useState([]);

  const getBookList = () => {
    bookListApi
      .get('/books')
      .then(response => {
        setBookList(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    // getBookList();
    setBookList(bookData);

    return () => {
      setBookList([]);
    };
  }, []);

  const renderItem = ({item}) => {
    return (
      <ListItem
        item={item}
        onSelect={() => navigation.navigate('BookDetails', {item: item})}
      />
    );
  };
  return (
    <View>
      <FlatList
        numColumns={2}
        data={bookList}
        renderItem={renderItem}
        keyExtractor={item => item.title}
      />
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
