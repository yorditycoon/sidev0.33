import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import { useState } from "react";
  import Recruit from "../Recruit";
  
  
  const { width, height } = Dimensions.get("window");
  
  
  export default function WorkerHome() {
    const [bottombarVisible, setBottomVisible] = useState(false);
    const bottomAnim = useState(new Animated.Value(-height * 0.9))[0];
  
  
    const toggleBottomBar = () => {
      Animated.timing(bottomAnim, {
        toValue: bottombarVisible ? -height * 0.9 : 0, // Fix negative value
        duration: 300,
        useNativeDriver: false,
      }).start();
      setBottomVisible(!bottombarVisible);
    };
  
  
    return (
      <View style={styles.container}>
        {/* Fixed Header */}
        <View style={styles.navigation}>
          <Ionicons name="menu" size={30} />
          <Text>Home</Text>
          <Ionicons name="person" size={30} />
        </View>
  
  
        <Text style={styles.heading}>Jobs</Text>
  
  
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonLabel}>Pending</Text>
          </TouchableOpacity>
  
  
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonLabel}>Accepted</Text>
          </TouchableOpacity>
        </View>
  
  
        {/* Scrollable Job Listings */}
        <ScrollView style={styles.jobList}>
          {[...Array(4)].map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={toggleBottomBar}
              style={styles.jobCard}
            >
              <View>
                <Text style={styles.jobTitle}>Professional Waiter</Text>
                <Text style={styles.jobCompany}>Dier Dubai</Text>
                <Text>15 AED /hour</Text>
                <View style={styles.starContainer}>
                  <Ionicons name="star" color="orange" />
                  <Ionicons name="star" color="orange" />
                  <Ionicons name="star" color="orange" />
                  <Ionicons name="star" color="orange" />
                </View>
              </View>
              <View style={styles.profileContainer}>
                <Ionicons name="person" size={30} />
                <Text>John Doe</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
  
  
        {/* Animated Bottom Bar */}
        <Animated.View
          style={[
            styles.bottombar,
            { bottom: bottomAnim }, // Move the animation logic here
          ]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={toggleBottomBar}>
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.bottomText}>Job Details</Text>
          <ScrollView>
            <Recruit />
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    navigation: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 20,
      backgroundColor: "#fff",
    },
    heading: {
      marginLeft: 30,
      fontSize: 20,
      fontWeight: "600",
      marginTop: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 20,
      marginBottom: 20,
    },
    button: {
      backgroundColor: "#134169",
      padding: 10,
      borderRadius: 20,
      width: "30%",
    },
    buttonLabel: {
      color: "white",
      textAlign: "center",
    },
    jobList: {
      flex: 1,
    },
    jobCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#D9D9D9",
      padding: 20,
      margin: 17,
      borderRadius: 15,
    },
    jobTitle: {
      fontWeight: "500",
      fontSize: 20,
    },
    jobCompany: {
      fontWeight: "500",
      color: "#868686",
    },
    starContainer: {
      flexDirection: "row",
    },
    profileContainer: {
      alignItems: "center",
    },
    bottombar: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      left: 10,
      right: 10,
      height: height * 0.9,
      backgroundColor: "#fff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      zIndex: 1500,
      paddingTop: 80,
      boxShadow: "0px 10px 10px 10px gray",
    },
    bottomText: {
      color: "white",
      fontSize: 18,
      fontWeight: "600",
    },
    closeButton: {
      position: "absolute",
      top: 10,
      right: 20,
      padding: 20,
      marginBottom: 20,
    },
  });
  
  
  
  
  
  