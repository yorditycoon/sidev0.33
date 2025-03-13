import { View, Text, ScrollView, TouchableOpacity,StyleSheet,Image } from 'react-native'
import React from 'react'

const SavedJobs = () => {
  return (
      <ScrollView style={styles.container}>
           <View style={styles.jobCard}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: 600 }}>
            Profesional waiter
          </Text>
          <Image source={require("../assets/images/bookmarkicon.png")} />
        </View>
        <Text style={{ color: "#868686", marginBottom: 10 }}>Dier Dubai</Text>
        <Text>Salary 15 AED /hour</Text>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text>Tue</Text>
            <Text
              style={{
                backgroundColor: "#C8C8C7",
                padding: 10,
                borderRadius: 12,
              }}
            >
              8:00 Am - 4:00 PM
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>Wed</Text>
            <Text
              style={{
                backgroundColor: "#C8C8C7",
                padding: 10,
                borderRadius: 12,
              }}
            >
              8:00 Am - 4:00 PM
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#868686", marginTop: 30 }}>
            Posted 2 days ago
          </Text>
          <TouchableOpacity
           style={styles.applyBtn}>
            <Text style={{ color: "white" }}>Apply Now</Text>
          </TouchableOpacity>
        </View>
          </View>
   </ScrollView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    jobCard: {
        backgroundColor: "#D9D9D9",
        width: "90 %",
        height: 250,
        padding: 22,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 15,
        marginBottom: 10,
        marginTop:60,
      },
      applyBtn: {
        backgroundColor: "#134169",
        paddingVertical: 10,
        borderTopLeftRadius: 12,
        borderBottomRightRadius: 12,
        marginTop: 22,
        marginLeft: 55,
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
      },
})
export default SavedJobs