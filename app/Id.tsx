import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { Camera } from "expo-camera";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseApp } from "../FireBaseConfig";
import { useRouter } from "expo-router";

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const Id = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [side, setSide] = useState(""); // "front" or "back"
  const [frontID, setFrontID] = useState(null);
  const [backID, setBackID] = useState(null);
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [error, setError] = useState("");
  const cameraRef = useRef(null);
  const router = useRouter();

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const startCamera = (side) => {
    requestCameraPermission();
    setCameraActive(true);
    setSide(side);
  };

  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCameraActive(false);
      if (side === "front") {
        setFrontID(photo);
        processOCR(photo.uri, "front");
      } else {
        setBackID(photo);
        processOCR(photo.uri, "back");
      }
    }
  };

  const processOCR = async (imageUri, side) => {
    try {
      let response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=YOUR_GOOGLE_CLOUD_API_KEY`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requests: [
              {
                image: { source: { imageUri } },
                features: [{ type: "TEXT_DETECTION" }],
              },
            ],
          }),
        }
      );

      let result = await response.json();
      let extractedText = result.responses[0]?.fullTextAnnotation?.text || "";
      if (side === "front") setFrontText(extractedText);
      else setBackText(extractedText);
    } catch (error) {
      setError("Error scanning ID: " + error.message);
    }
  };

  const validateID = () => {
    if (!frontID || !backID) {
      setError("Please scan both sides of the ID.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateID()) return;

    setError("");
    try {
      const frontRef = ref(storage, `idUploads/front_${Date.now()}.jpg`);
      const backRef = ref(storage, `idUploads/back_${Date.now()}.jpg`);

      const frontBlob = await (await fetch(frontID.uri)).blob();
      const backBlob = await (await fetch(backID.uri)).blob();

      const frontUploadTask = uploadBytesResumable(frontRef, frontBlob);
      const backUploadTask = uploadBytesResumable(backRef, backBlob);

      frontUploadTask.on(
        "state_changed",
        null,
        (error) => setError("Front ID upload failed: " + error.message),
        async () => {
          const frontUrl = await getDownloadURL(frontUploadTask.snapshot.ref);
          backUploadTask.on(
            "state_changed",
            null,
            (error) => setError("Back ID upload failed: " + error.message),
            async () => {
              const backUrl = await getDownloadURL(backUploadTask.snapshot.ref);
              await addDoc(collection(db, "verifiedIDs"), {
                frontUrl,
                backUrl,
                frontText,
                backText,
              });
              router.push("/SuccessPage");
            }
          );
        }
      );
    } catch (error) {
      setError("Error submitting data: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      {cameraActive ? (
        <Camera style={styles.camera} ref={cameraRef}>
          <TouchableOpacity style={styles.captureButton} onPress={captureImage}>
            <Text style={styles.captureText}>Capture</Text>
          </TouchableOpacity>
        </Camera>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>Scan Front Side of ID</Text>
          <TouchableOpacity style={styles.scanButton} onPress={() => startCamera("front")}>
            <Text style={styles.scanText}>Scan Front</Text>
          </TouchableOpacity>
          {frontID && <Image source={{ uri: frontID.uri }} style={styles.idImage} />}
          {frontText ? <Text style={styles.scannedText}>Scanned Front Text: {frontText}</Text> : null}

          <Text style={styles.label}>Scan Back Side of ID</Text>
          <TouchableOpacity style={styles.scanButton} onPress={() => startCamera("back")}>
            <Text style={styles.scanText}>Scan Back</Text>
          </TouchableOpacity>
          {backID && <Image source={{ uri: backID.uri }} style={styles.idImage} />}
          {backText ? <Text style={styles.scannedText}>Scanned Back Text: {backText}</Text> : null}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", padding: 15 },
  scrollContainer: { flexGrow: 1, justifyContent: "center", alignItems: "center", width: "100%" },
  label: { fontSize: 16, alignSelf: "center", marginBottom: 5 },
  scanButton: { width: "90%", backgroundColor: "#134169", paddingVertical: 12, borderRadius: 10, alignItems: "center", justifyContent: "center", marginBottom: 15 },
  scanText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  idImage: { width: 300, height: 180, marginBottom: 10, borderRadius: 10 },
  scannedText: { color: "green", marginBottom: 10, textAlign: "center" },
  submitButton: { width: "90%", height: 50, backgroundColor: "#134169", justifyContent: "center", alignItems: "center", borderRadius: 10, marginTop: 10 },
  submitText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  errorText: { color: "red", marginBottom: 5, textAlign: "center" },
  camera: { flex: 1, width: "100%" },
  captureButton: { position: "absolute", bottom: 20, left: "40%", backgroundColor: "#fff", padding: 10, borderRadius: 10 },
  captureText: { fontSize: 18, fontWeight: "bold" },
});

export default Id;
