import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { auth } from "../FireBaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export default function Index() {
  const navigation = useNavigation();

  
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/splash-icon.png")}
      />

      <Text style={styles.title}>Register Now</Text>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate("Signupcompany")}
      >
        <Text style={styles.signupText}>As a Company</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate("Signupworker")}
      >
        <Text style={styles.signupText}>As a Worker</Text>
      </TouchableOpacity>

      <Link href="/Login">
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 100,
  },
  signupButton: {
    width: "70%",
    height: 60,
    backgroundColor: "rgba(19, 65, 105, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 10,
  },
  signupText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 5,
    fontSize: 16,
    color: "#007bff",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 100,
    resizeMode: "contain",
  },
});
