import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Button,
} from 'react-native';

import FormContainer from '../../components/FormContainer';
import Input from '../../components/Input';
import Error from '../../components/Error';
import AuthGlobal from '../../Context/store/AuthGlobal';
import {loginUser} from '../../Context/actions/AuthActions';

const Login = ({navigation}) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      navigation.navigate('BooksScreen');
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email: email,
      password: password,
    };

    if (email === '' || password === '') {
      setError('Please fill in your credentials');
    } else {
      // console.log('success');
      loginUser(user, context.dispatch);
      Keyboard.dismiss();
    }
  };

  return (
    <FormContainer title="Login">
      <Input
        placeholder={'Enter Email'}
        name={'email'}
        id={'email'}
        value={email}
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

      {error ? <Error message={error} /> : null}

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          handleSubmit();
          // Keyboard.dismiss;
        }}>
        {/* <View style={styles.buttonGroup}> */}
        <Text style={styles.buttonText}>Login</Text>
        {/* </View> */}
      </TouchableOpacity>
      {/* <Button
          title="Login"
          onPress={() => {
            handleSubmit();
          }} */}

      <Text style={styles.middleText}>Don't have account?</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate('Register');
        }}>
        {/* <View style={styles.buttonGroup}> */}
        <Text style={styles.buttonText}>Register</Text>
        {/* </View> */}
      </TouchableOpacity>
      {/* <Button
          title="Register"
          onPress={() => navigation.navigate('Register')}
        /> */}
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    // borderWidth: 1,
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 20,
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
});

export default Login;
