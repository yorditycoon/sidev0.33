import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView,Pressable } from "react-native";
import { Link } from "expo-router";


const CompanyForm = ({  }) => {
    
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+971");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [emiratesIdFile, setEmiratesIdFile] = useState(null);
  const [error, setError] = useState("");

  
  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} >
      
<Image source={require("..//assets/images/splash-icon.png")} style={styles.profileLogo} />
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+971"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>CV</Text>
        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.uploadButton} >
            <Image source={require("..//assets/images/upload-icon.png")} style={styles.uploadIcon} />
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
          <View style={styles.fileBox}><Text>{ "No file uploaded"}</Text></View>
        </View>

        <Text style={styles.label}>Emirates ID</Text>
        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.uploadButton} >
            <Image source={require("..//assets/images/upload-icon.png")} style={styles.uploadIcon} />
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
          <View style={styles.fileBox}><Text>{ "No file uploaded"}</Text></View>
        </View>
        <Text style={styles.privacyText}>
                          I have read and agreed to the{" "}
                         <Link  href="/Privacy" style={styles.link}>PrivacyPolicy</Link>
                        </Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            if (!fullName || !email || !phone || !password || !cvFile || !emiratesIdFile) {
              setError("Please fill in all fields including the CV and Emirates ID");
            } else if (!/\S+@\S+\.\S+/.test(email)) {
              setError("Please enter a valid email address");
            } else if (phone.length < 9 || !/^\+?\d+$/.test(phone)) {
              setError("Please enter a valid phone number");
            } else if (password.length < 8) {
              setError("Password must be at least 8 characters");
            }
          }}
          accessibilityRole="button"
          accessibilityLabel="Submit worker registration"
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
    
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
   },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    padding: 15,
    
  },
  label: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 2,
  },
  input: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,

  },
  uploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(19, 65, 105, 1)",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginRight: 10,
  },
  uploadIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  uploadText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },

  picker: {
    width: "100%",
    height: 50,
  },

  fileBox: {
    width: 150,
    height: 40,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  errorText: {
    color: 'red',
    marginBottom: 5,
  },

  button: {
    width: "70%",
    height: 50,
    backgroundColor: "rgba(19, 65, 105, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 5,
    marginLeft: 50,
  },
  
  profileLogo: {
    width: 80,
    height: 80,
    marginLeft:125,
    marginTop: 50,  
  },

  privacyText: {
    marginLeft: 5,
    marginBottom:5,
  },

  link: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});



export default CompanyForm;
