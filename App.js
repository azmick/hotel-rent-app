// App.js
import React from 'react'
import {View, Text} from 'react-native'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {CButton} from './components/CButton'
const Stack = createStackNavigator();

const App = () => {
  return (
    <>
<NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Giriş Yap" component={LoginPage} />
        <Stack.Screen name="Üye Ol" component={RegisterPage} />
      </Stack.Navigator>
</NavigationContainer>
    </>
    )
};

export default App;
