import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Content, Left, Body, ListItem, Thumbnail, Text} from 'native-base';

var {width} = Dimensions.get('window');

const SearchedBook = ({booksFiltered, navigation}) => {
  return (
    <Content style={{width: width}}>
      {booksFiltered.length > 0 ? (
        booksFiltered.map(item => {
          <ListItem
            key={item._id}
            onPress={() => {
              navigation.navigate('BookDetails', {item: item});
            }}
            avatar>
            <Left>
              <Thumbnail source={{uri: item.image}} />
            </Left>
            <Body>
              <Text>{item.title}</Text>
              <Text note>{item.description}</Text>
            </Body>
          </ListItem>;
        })
      ) : (
        <View style={styles.center}>
          <Text style={{alignSelf: 'center'}}>
            No books match the selected criteria
          </Text>
        </View>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

export default SearchedBook;
