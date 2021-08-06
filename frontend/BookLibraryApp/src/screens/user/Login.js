import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
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
      console.log('success');
      loginUser(user, context.dispatch);
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
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <Button title="Login" onPress={() => handleSubmit()} />
      </View>
      <View style={({marginTop: 40}, styles.buttonGroup)}>
        <Text style={styles.middleText}>Don't have account?</Text>
        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default Login;
