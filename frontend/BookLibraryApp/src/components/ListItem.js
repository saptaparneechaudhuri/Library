import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
} from 'react-native';

const ListItem = ({item, onSelect}) => {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={onSelect}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: item.image}}
            resizeMode="contain"
          />
          <View style={styles.titleContainer}>
            <Text numberOfLines={2}>{item.title}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  imageContainer: {
    width: '93%',
    height: 300,
    // borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 15,
  },
  image: {
    height: '80%',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleContainer: {
    margin: 10,
    alignSelf: 'center',
  },
});

export default ListItem;
