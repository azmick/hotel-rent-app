// App.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './pages/HomePage';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {user && isLogin ? (
            <Stack.Screen
              name="Giris Yap"
              component={HomePage}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name={user ? "Tekrar Giriş Yap" : "Giriş Yap"}
              component={() => <LoginPage setIsLogin={setIsLogin} />}
              options={{ headerShown: true }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
