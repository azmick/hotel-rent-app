import React, { useState,useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CButton } from '../components/CButton';
import { styles } from '../styles/Style'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';


const Login = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const auth = FIREBASE_AUTH;
  const store = FIRESTORE_DB;

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userRecord = await auth.currentUser.getIdTokenResult();
          const userRef = doc(store, 'users', userRecord.uid);
          const userDataSnap = await getDoc(userRef);
          if (userDataSnap.exists()) {
            setUserData(userDataSnap.data());
          } else {
            console.log('No user data found.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      }
    };
    
  
    fetchUserData();
  }, []);
  



  const handleLogin = () => {

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
  
      // Kullanıcı verilerini çektikten sonra, kullanıcının rolünü kontrol edin
      const userRef = doc(store, 'users', response.user.uid); // userRef'i burada tanımla
      if ((await getDoc(userRef)).data().roles === 'admin') {
        navigation.navigate('AdminPanel');
      } else {
        navigation.navigate('Home');
      }
    } catch (err) {
      console.error('Giriş için hata:', err.message);
      // Kullanıcı hata aldığında bir şeyler yapabilirsiniz, örneğin kullanıcıya bir hata mesajı göstermek
      alert("Giriş başarısız!");
    } finally {
      setLoading(false);
    }
  };
  
  const signUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("Check your emails!");
      // Kullanıcının email bilgilerini Firestore'a kaydet
      const userRef = doc(store, 'users', response.user.uid);
      await setDoc(userRef, {
        email: email,
        roles: 'user',
      });
  
      // İsterseniz kullanıcı belgesini alabilir ve state'e atabilirsiniz
      const userDataSnap = await getDoc(userRef);
      if (userDataSnap.exists()) {
        setUserData(userDataSnap.data());
      } else {
        console.log('No user data found.');
      }
  
    } catch (error) {
      console.error(error);
      alert("Failed Sign Up!");
    } finally {
      // Gerekirse, burada başka işlemler yapabilirsiniz
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