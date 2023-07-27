import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../constants/images';
import icons from '../../constants/icons'

const LoginScreen = ({ email, password, handleLogin, isValidEmail, isValidPassword, setEmail, setPassword }) => {
  return (
    <LinearGradient colors={['#4568DC', '#43C6AC']} style={styles.container}>
      <Image source={images.logo} style={styles.logo} />

      <Text style={styles.loginTitle}>Login</Text>
      <View style={styles.inputContainer}>
        <Image source={icons.email} style={styles.iconImg} />
        <TextInput
          style={[styles.input, !isValidEmail && styles.inputError]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      {!isValidEmail && (
        <Text style={styles.errorText}>Please enter a valid email address</Text>
      )}
      <View style={styles.inputContainer}>
        <Image source={icons.password} style={styles.iconImg} />
        <TextInput
          style={[styles.input, !isValidPassword && styles.inputError]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      {!isValidPassword && (
        <Text style={styles.errorText}>Please enter a valid password</Text>
      )}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    width: '90%',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    marginBottom: 20,
  },
  iconImg: {
    width: 20,
    height: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    color: '#fff',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#4568DC',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
