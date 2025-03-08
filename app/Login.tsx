import React, { useState } from "react";
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";

const LoginScreen = ( ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <View style={styles.container}>
      <Image
                style={styles.image}
                source={require("../assets/images/splash-icon.png")}
              />

      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        accessibilityLabel="Email input"
        accessibilityHint="Enter your email address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Password input"
        accessibilityHint="Enter your password"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => {
          if (!email || !password) {
            setError("Please fill in both email and password");
          } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address (e.g., user@example.com)");
          } else if (password.length < 8) {
            setError("Password must be at least 8 characters");
          }   
        }}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
<Link  href="/">
        <Text style={styles.loginText}>Don't have an account? Sign up</Text></Link>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 50,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    
  },
  button: {
    width: "70%",
    height: 50,
    backgroundColor: "rgba(19, 65, 105, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    fontSize: 16,
    color: "#007bff",
    
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
  
    marginBottom: 100,
    resizeMode: 'contain',
  },
  loginText: {
    marginTop: 5,
    fontSize: 16,
    color: "#007bff",
  },
});



export default LoginScreen;



