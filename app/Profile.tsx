import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 20,
          }}
        >
          <Image source={require("../assets/images/whiteHamIcon.png")} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 150, height: 150, padding: 20 }}
            source={require("../assets/images/Ellipse 4.png")}
          />
          <Text style={{ color: "white", fontSize: 22 }}>John Doe</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.profileText}>4.0</Text>
            <View style={{ flexDirection: "row" }}>
              <Image source={require("../assets/images/staricon.png")} />
              <Image source={require("../assets/images/staricon.png")} />
              <Image source={require("../assets/images/staricon.png")} />
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.profileText}>5</Text>
            <Text style={styles.profileText}>Level</Text>
          </View>
        </View>
      </View>

      <Text style={{ fontSize: 20, margin: 20 }}>Applied jobs</Text>

          <ScrollView>
              <View style={styles.appliedjobsBox}>
                  <View style={{flexDirection:'column',justifyContent:'space-between',padding:15}}>
                      <Text style={{fontSize:18,fontWeight:600}}>Professional waiter</Text>
                      <Text style={{color:'#868686'}}>Dier dubai</Text>
                      <Text>15 AED/hour</Text>
                      
                  </View>
                  <View style={{alignItems:'center'}}>
                      <Text>Status</Text>
                      <Text style={{color:'green'}}>Approved</Text>
                  </View>
              </View>
              <View style={styles.appliedjobsBox}>
                  <View style={{flexDirection:'column',justifyContent:'space-between',padding:15}}>
                      <Text style={{fontSize:18,fontWeight:600}}>Professional waiter</Text>
                      <Text style={{color:'#868686'}}>Dier dubai</Text>
                      <Text>15 AED/hour</Text>
                      
                  </View>
                  <View style={{alignItems:'center'}}>
                      <Text>Status</Text>
                      <Text style={{color:'#868686'}}>Pending</Text>
                  </View>
              </View>
              <View style={styles.appliedjobsBox}>
                  <View style={{flexDirection:'column',justifyContent:'space-between',padding:15}}>
                      <Text style={{fontSize:18,fontWeight:600}}>Professional waiter</Text>
                      <Text style={{color:'#868686'}}>Dier dubai</Text>
                      <Text>15 AED/hour</Text>
                      
                  </View>
                  <View style={{alignItems:'center'}}>
                      <Text>Status</Text>
                      <Text style={{color:'red'}}>Rejected</Text>
                  </View>
              </View>
              <View style={styles.appliedjobsBox}>
                  <View style={{flexDirection:'column',justifyContent:'space-between',padding:15}}>
                      <Text style={{fontSize:18,fontWeight:600}}>Professional waiter</Text>
                      <Text style={{color:'#868686'}}>Dier dubai</Text>
                      <Text>15 AED/hour</Text>
                      
                  </View>
                  <View style={{alignItems:'center'}}>
                      <Text>Status</Text>
                      <Text style={{color:'green'}}>Approved</Text>
                  </View>
              </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileBox: {
    width: "100%",
    height: 350,
    backgroundColor: "#134169",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileText: {
    color: "white",
    fontWeight: 800,
    fontSize: 20,
    },
    appliedjobsBox: {

        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        width: '90%',
        height: 100,
        marginLeft: 20,
        marginRight: 10,
        padding: 15,
        borderRadius: 15,
        marginBottom:12,
  }
});
export default Profile;
