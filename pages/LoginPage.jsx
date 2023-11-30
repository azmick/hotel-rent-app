import React, { useState } from 'react';
import { SafeAreaView,View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CButton } from '../components/CButton';
import {styles} from '../styles/Style'



const Login = () => {
const navigation = useNavigation();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

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

return (
    <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
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
      <CButton title='Giriş Yap' style={styles.button} backgroundcolor='green' functions={handleLogin} />
      <CButton title='Üye Ol' style={styles.button} functions={handleRegister} />
      </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
