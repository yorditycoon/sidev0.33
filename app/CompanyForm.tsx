import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Link } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { WebView } from "react-native-webview";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { firebaseApp, db, storage } from "../FirebaseConfig";

const CompanyForm = () => {
  const [companyName, setCOMPANYName] = useState("");
  const [phone, setPhone] = useState("+971");
  const [location, setLocation] = useState("");
  const [businessLicense, setBusinessLicense] = useState(null);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (result.canceled === false) {
      setBusinessLicense(result.assets[0]); // Store file details
    }
  };

  const handleSubmit = async () => {
    if (!companyName  || !phone || !businessLicense) {
      setError("Please fill in all fields and upload a business license.");
      return;
    } else if (phone.length < 9 || !/^\+?\d+$/.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError(""); // Clear previous errors

    // Upload business license to Firebase Storage
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `businessLicenses/${businessLicense.name}`);
    const uploadTask = uploadBytesResumable(storageRef, businessLicense.uri);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload failed: ", error);
      },
      async () => {
        const businessLicenseUrl = await getDownloadURL(
          uploadTask.snapshot.ref
        );

        // Save form data to Firestore
        const db = getFirestore(firebaseApp);
        await setDoc(doc(db, "companies"), {
          companyName,
          
          phone,
          location,
          
          businessLicenseUrl,
        });

        console.log("Company information submitted successfully!");
      }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../assets/images/splash-icon.png")}
          style={styles.profileLogo}
        />

        <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          value={companyName}
          onChangeText={setCOMPANYName}
        />

        

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+971"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

Yonas, [3/12/2025 8:38 PM]
<Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />

       

        <Text style={styles.label}>Business License</Text>
        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
            <Image
              source={require("../assets/images/upload-icon.png")}
              style={styles.uploadIcon}
            />
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>

          {businessLicense ? (
            <TouchableOpacity
              style={styles.fileBox}
              onPress={() => setModalVisible(true)}
            >
              <Text
                numberOfLines={1}
                style={{ color: "blue", textDecorationLine: "underline" }}
              >
                {businessLicense.name}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.fileBox}>
              <Text>No file uploaded</Text>
            </View>
          )}
        </View>

        <Text style={styles.privacyText}>
          I have read and agreed to the{" "}
          <Link href="/Privacy" style={styles.link}>
            Privacy and Policy
          </Link>
        </Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal for PDF Preview */}
      {businessLicense && (
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Close</Text>
            </TouchableOpacity>
            <WebView
              source={{ uri: businessLicense.uri }}
              style={{ flex: 1 }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  scrollContainer: {},
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  fileBox: {
    width: 150,
    height: 40,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
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
    marginLeft: 125,
    marginTop: 100,
    marginBottom:100,
  },
  privacyText: {
    marginLeft: 5,
    marginBottom: 5,
  },
  link: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  closeButton: {
    backgroundColor: "black",
    padding: 10,
    alignItems: "center",
  },
});

export default CompanyForm;