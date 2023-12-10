import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CButton } from '../components/CButton';
import { styles } from '../styles/Style'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ setIsLogin }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const auth = FIREBASE_AUTH;

  const handleLogin = () => {
    // Burada giriş işlemlerini gerçekleştirebilirsiniz.
    console.log('Email:', email);
    console.log('Password:', password);
    // Örneğin, Firebase veya benzeri bir servisi kullanabilirsiniz.
  };

  const handleRegister = () => {
    // Üye Ol butonuna basıldığında kayıt sayfasına yönlendirme yap
    navigation.navigate('Üye Ol');
  };
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      setIsLogin(true);
      alert("Check your emails!");
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      setIsLogin(false);
      alert("Check your emails!");
    } catch (error) {
      console.log(error);
      alert("Failed Sign Up!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>

        <KeyboardAvoidingView behavior='padding'>

          <Text style={styles.title}>Otel Rezervasyonu</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
          <View style={styles.groupButton}>
            {loading ? (<ActivityIndicator size="large" color="0000ff" />)
              : (<>
                <CButton title='Giriş Yap' style={styles.button} backgroundcolor='green' functions={signIn} />
                <CButton title='Üye Ol' style={styles.button} functions={signUp} />

              </>
              )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Login;
