import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import bookListApi from '../api/bookListApi';
import ListItem from '../components/ListItem';
import {bookData} from '../data/bookInventory';
import bookDetailsApi from '../api/bookDetailsApi';

const BooksScreen = ({navigation}) => {
  const [bookList, setBookList] = useState([]);
  const [bookDetail, setBookDetail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getBookList = () => {
    bookListApi
      .get('/books')
      .then(response => {
        setBookList(response.data);
        // console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBookList();
    // setBookList(bookData);
    setIsLoading(false);

    return () => {
      setBookList([]);
      setIsLoading(true);
    };
  }, []);

  const getBookDetails = id => {
    bookDetailsApi.get(`/${id}`).then(response => {
      // console.log(response.data);
      setBookDetail(response.data);
    });
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
      {isLoading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <FlatList
          numColumns={2}
          data={bookList}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          onEndReachedThreshold={0.1}
        />
      )}
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
