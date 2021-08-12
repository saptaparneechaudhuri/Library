import React, {useState, useCallback} from 'react';
import {View, FlatList, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import issuesApi from '../../api/issuesApi';

const Issues = props => {
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
  return (
    <View>
      {/* <FlatList
        data={issues}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
    </View>
  );
};

export default Issues;
