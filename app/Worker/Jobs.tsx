import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const JobListing = () => {
  const [search, setSearch] = useState("");
  const jobs = [
    {
      title: "Professional Waiter",
      location: "Dier Dubai",
      salary: "15 AED/hour",
      schedule: [
        { day: "Tue", time: "8:00 AM - 3:00PM" },
        { day: "Wed", time: "8:00 AM - 3:00PM" },
        { day: "Fri", time: "8:00 AM - 3:00PM" },
      ],
      posted: "2 days ago",
    },
    {
      title: "Professional Waiter",
      location: "Dier Dubai",
      salary: "15 AED/hour",
      schedule: [
        { day: "Tue", time: "8:00 AM - 3:00PM" },
        { day: "Wed", time: "8:00 AM - 3:00PM" },
        { day: "Fri", time: "8:00 AM - 3:00PM" },
      ],
      posted: "2 days ago",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={24} />
        <Text style={styles.headerTitle}>Home</Text>
        <Ionicons name="person-circle" size={24} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Explore job"
        value={search}
        onChangeText={setSearch}
      />
      <Text style={styles.jobsTitle}>Jobs for you</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Ionicons name="bookmark-outline" size={20} />
            </View>
            <Text style={styles.jobLocation}>{item.location}</Text>
            <Text style={styles.jobSalary}>Salary {item.salary}</Text>
            <View style={styles.scheduleContainer}>
              {item.schedule.map((slot, i) => (
                <Text key={i} style={styles.scheduleText}>{slot.day} {slot.time}</Text>
              ))}
            </View>
            <Text style={styles.postedText}>Posted {item.posted}</Text>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply now</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     padding: 0,
     flex: 1 
    },
  header: {
     flexDirection: "row", 
     justifyContent: "space-between",
      alignItems: "center", 
      marginBottom: 16 
    },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: "bold"
   },
  searchInput: { 
    borderWidth: 1, 
    borderRadius: 8,
     padding: 10, 
     marginBottom: 16 
    },
  jobsTitle: {
     fontSize: 18,
      fontWeight: "bold",
       marginBottom: 8 
      },
  jobCard: { 
    backgroundColor: "#fff",
     padding: 16,
      marginBottom: 12,
       borderRadius: 8,
        elevation: 2 
      },
  jobHeader: {
     flexDirection: "row",  
    justifyContent: "space-between" 
  },
  jobTitle: {
     fontSize: 16, 
     fontWeight: "bold"
     },
  jobLocation: {
     color: "gray" 
    },
  jobSalary: { 
    fontWeight: "bold"
   },
  scheduleContainer: { marginTop: 8, backgroundColor: "#f5f5f5", padding: 8, borderRadius: 6 },
  scheduleText: { fontSize: 14, fontWeight: "500" },
  postedText: { color: "gray", fontSize: 12, marginTop: 8 },
  applyButton: { marginTop: 12, backgroundColor: "#007BFF", padding: 12, borderRadius: 6, alignItems: "center" },
  applyButtonText: { color: "white", fontWeight: "bold" },
});

export default JobListing;
