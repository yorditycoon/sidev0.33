import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../FireBaseConfig";  

const Signupcompany = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth1 = getAuth();
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth1, email, password);
      const user = userCredential.user;

      // ✅ Create Firestore document with user UID
      await setDoc(doc(firestore, "companies", user.uid), {
        email,
        userType: "company",  
        createdAt: new Date(),
      });

      console.log("SignUp successful");
      router.push("/CompanyForm");  // Redirect to the form page
    } catch (error) {
      setError(error.message);
      console.error("Signup Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/images/splash-icon.png")} />
      <Text style={styles.title}>Sign up as company</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign up</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#000000", marginBottom: 50 },
  input: { width: "100%", height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, paddingHorizontal: 10, marginBottom: 15 },
  button: { width: "70%", height: 50, backgroundColor: "rgba(19, 65, 105, 1)", justifyContent: "center", alignItems: "center", borderRadius: 30, marginTop: 10, marginBottom: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  errorText: { color: "red", marginBottom: 10 },
  image: { width: 100, height: 100, marginBottom: 100, resizeMode: "contain" },
});

export default Signupcompany;
