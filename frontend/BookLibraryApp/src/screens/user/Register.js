import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import FormContainer from '../../components/FormContainer';
import Input from '../../components/Input';
import Error from '../../components/Error';
import registerApi from '../../api/registerApi';
import Toast from 'react-native-toast-message';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const register = () => {
    if (email === '' || name === '' || password === '') {
      setError('Please fill the form correctly');
    }

    let user = {
      name: name,
      email: email,
      password: password,
    };

    registerApi
      .post('/user', user)
      .then(response => {
        if (response.status === 200) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Registration Succeeded',
            text2: 'Please login to access library',
          });
          setTimeout(() => navigation.navigate('BooksScreen'), 500);
        }
      })
      .catch(err => {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Registration Failed',
          text2: 'Something went wrong!',
        });
        console.log(err);
      });
  };
  return (
    <FormContainer title="Register">
      <Input
        placeholder={'Name'}
        name={'name'}
        id={'name'}
        onChangeText={text => setName(text)}
      />
      <Input
        placeholder={'Email'}
        name={'email'}
        id={'email'}
        onChangeText={text => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={'Enter Password'}
        name={'password'}
        id={'password'}
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View>{error ? <Error message={error} /> : null}</View>
      <View style={styles.buttonGroup}>
        <Button title="Register" onPress={() => register()} />
      </View>
      <View>
        <Button
          title="Back to Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    margin: 10,
    alignItems: 'center',
  },
});

export default Register;
