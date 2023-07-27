import React, { useState } from 'react';
import HomeScreen from '../components/home/homeScreen';
import LoginScreen from "../components/login/loginScreen"
import { Stack } from 'expo-router';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    setIsValidEmail(emailRegex.test(email));
    setIsValidPassword(password.trim() !== '');

    if (emailRegex.test(email) && password.trim() !== '') {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  return (
    <>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
    />
      {isLoggedIn ? (
        <HomeScreen onLogout={handleLogout} />
      ) : (
        <LoginScreen
          email={email}
          password={password}
          handleLogin={handleLogin}
          isValidEmail={isValidEmail}
          isValidPassword={isValidPassword}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      )}
    </>
  );
};

export default App;
