import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';
var {height, width} = Dimensions.get('window');

import issuesApi from '../api/issuesApi';

const IssuesScreen = () => {
  const [issues, setIssues] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getIssueList = () => {
    issuesApi.get('/bookissue').then(response => {
      // console.log(response.data);
      setIssues(response.data);
      setIsLoading(false);
    });
  };

  useFocusEffect(
    useCallback(() => {
      getIssueList();
      // console.log(issues);

      return () => {
        setIssues([]);
        setIsLoading(true);
      };
    }, []),
  );

  const renderItem = ({item}) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{uri: item.image}}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={{marginHorizontal: 5, marginTop: 5}}>
          <Text numberOfLines={2}>bookId: {item.id}</Text>
          <Text>User: {item.user.name}</Text>
          <Text>Issued On: {item.issueDateFormat}</Text>
          <Text>Return Due By: {item.returnDateFormat}</Text>
          <Text>Status: {item.status}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          data={issues}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 100,
  },
  container: {
    flex: 1,
    padding: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    padding: 5,
    marginBottom: 5,
  },
  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IssuesScreen;
