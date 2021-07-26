import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const DetailItem = props => {
  return (
    <View style={styles.detailItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const BookDetailScreen = ({route}) => {
  const {item} = route.params;
  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{uri: item.image}}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Lend</Text>
      </TouchableOpacity>
      <View style={{borderWidth: 1, marginTop: 15}}>
        <DetailItem>Title: {item.title}</DetailItem>
        <DetailItem>Count: {item.count}</DetailItem>
        <DetailItem>Authors: {item.authors.map(author => author)}</DetailItem>
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
