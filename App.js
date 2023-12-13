// App.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './pages/HomePage';
import AdminPanelPage from './pages/AdminPanelPage';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createStackNavigator();

// App.jsr

const App = () => {
  const [user, setUser] = useState(null);
  const [isLogin,setIsLogin] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
  //     console.log("user", user);
  //     setUser(user);

  //     // Check if the user is logged in and determine if they are an admin
  //     if (user) {
  //       // Assuming you have a way to determine if the user is an admin (e.g., user roles)
  //       const isAdmin = await checkIfUserIsAdmin(user.uid);

  //       if (isAdmin) {
  //         // Navigate to the admin panel
  //         navigation.replace("AdminPanel"); // Update with your admin panel route
  //       } else {
  //         // Navigate to the home page
  //         setIsLogin(true);
  //       }
  //     }
  //   });

  //   // Clean up the subscription on component unmount
  //   return () => unsubscribe();
  // }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {/* {user && isLogin ? (
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name={user ? "Admin Panel" : "Login"}
              component={() => <LoginPage setIsLogin={setIsLogin} />}
              options={{ headerShown: true }}
            />
          )} */}
          <Stack.Screen name='Login' component={LoginPage} options={{headerShown: true}}/>
          <Stack.Screen name='Home' component={HomePage}/>
          <Stack.Screen name='AdminPanel' component={AdminPanelPage} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
