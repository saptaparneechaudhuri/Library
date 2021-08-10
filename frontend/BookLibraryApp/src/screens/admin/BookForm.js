import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Button,
} from 'react-native';
// import {Item} from 'native-base';
import FormContainer from '../../components/FormContainer';
import Input from '../../components/Input';
import Error from '../../components/Error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import bookListApi from '../../api/bookListApi';
import editBookApi from '../../api/editBookApi';

const BookForm = props => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [isbn, setIsbn] = useState('');
  const [count, setCount] = useState(0);
  const [authors, setAuthors] = useState([]);
  const [description, setDescription] = useState('');
  const [subjectcode, setSubjectCode] = useState('');
  const [err, setError] = useState();
  const [token, setToken] = useState();
  // item is sent as a route parameter on clicking edit button in the modal
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setTitle(props.route.params.item.title);
      setImage(props.route.params.item.image);
      setIsbn(props.route.params.item.ISBN);
      setCount(props.route.params.item.count.toString());
      setAuthors(props.route.params.item.authors.join(','));
      setDescription(props.route.params.item.description);
      console.log(props.route.params.item.subjectCode);
      setSubjectCode(props.route.params.item.subjectCode);
    }
    AsyncStorage.getItem('jwt')
      .then(res => setToken(res))
      .catch(error => console.log(error));

    return () => {
      setAuthors([]);
    };
  }, []);

  const addBook = () => {
    if (
      title === '' ||
      image === '' ||
      isbn === '' ||
      count === null ||
      authors.length === 0 ||
      description === '' ||
      subjectcode === ''
    ) {
      setError('Please fill in all the fields properly');
    }

    let newBook = {
      title: title,
      image: image,
      ISBN: isbn,
      count: count,
      authors: authors,
      description: description,
      subjectCode: subjectcode,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    if (item !== null) {
      // put request for editing the book
      editBookApi
        .put(`/books/${item._id}`, newBook, config)
        .then(response => {
          if (response.status === 200 || response.status === 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'Book Updated',
              text2: 'Please see the book list',
            });
            setTimeout(() => {
              props.navigation.navigate('BooksAdmin');
            }, 500);
          }
        })
        .catch(error => {
          console.log(error);
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Book Update Failed',
            text2: 'Something went wrong',
          });
        });
    } else {
      // post request for new book
      bookListApi
        .post('/books', newBook, config)
        .then(response => {
          if (response.status === 200 || response.status === 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'New Book Added',
              text2: 'Please see the book list',
            });
            setTimeout(() => {
              props.navigation.navigate('BooksAdmin');
            }, 500);
          }
        })
        .catch(error => {
          console.log(error);
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Book Add Failed',
            text2: 'Something went wrong',
          });
        });
    }
  };

  return (
    <FormContainer title="Add Book">
      <View style={styles.label}>
        <Text style={{textDecorationLine: 'underline'}}>Title</Text>
      </View>

      <Input
        placeholder="Title"
        name="title"
        id="title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <View style={styles.label}>
        <Text style={{textDecorationLine: 'underline'}}>Image_Url</Text>
      </View>
      <Input
        placeholder="Image_Url"
        name="image"
        id="image"
        value={image}
        onChangeText={text => setImage(text)}
      />
      <View style={styles.label}>
        <Text style={{textDecorationLine: 'underline'}}>ISBN</Text>
      </View>
      <Input
        placeholder="ISBN"
        name="isbn"
        id="isbn"
        value={isbn}
        onChangeText={text => setIsbn(text)}
      />
      <View style={styles.label}>
        <Text style={{textDecorationLine: 'underline'}}>Count</Text>
      </View>
      <Input
        placeholder="Count"
        name="count"
        id="count"
        value={count}
        onChangeText={text => setCount(text)}
      />
      <View style={styles.label}>
        <Text style={{textDecorationLine: 'underline'}}>Authors</Text>
      </View>
      <Input
        placeholder="Authors"
        name="authors"
        id="authors"
        value={authors}
        onChangeText={text => {
          let authorsArray = text.split(',');
          setAuthors(authorsArray);
        }}
      />
      <View style={styles.label}>
        <Text style={{textDecorationLine: 'underline'}}>Description</Text>
      </View>
      <Input
        placeholder="Description"
        name="description"
        id="description"
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <View style={styles.label}>
        <Text style={{textDecorationLine: 'underline'}}>Subject_Code</Text>
      </View>
      <Input
        placeholder="Subject Code"
        name="subjectCode"
        id="subjectCode"
        value={subjectcode}
        onChangeText={text => setSubjectCode(text)}
      />
      {err ? <Error message={err} /> : null}
      <View style={styles.buttonContainer}>
        <Button title="Confirm" color="#00CCCC" onPress={() => addBook()} />
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '80%',
    marginTop: 10,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 80,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default BookForm;
