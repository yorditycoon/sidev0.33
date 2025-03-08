import { Text,  TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';



const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>Privacy Policy</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Effective Date: October 2023</Text>
        
        <Text style={styles.sectionText}>
          1. <Text style={styles.bold}>Introduction</Text>{"\n"}
          - Welcome to Side ("we," "our," or "us").{"\n"}
          - This Privacy Policy explains how we collect, use, and protect your personal information.{"\n"}
          - Our platform connects employers and employees and charges per hour.{"\n"}
          - We comply with UAE data protection laws, including the UAE Personal Data Protection Law (PDPL).
        </Text>

        <Text style={styles.sectionText}>
          2. <Text style={styles.bold}>Information We Collect</Text>{"\n"}
          - Personal Information – Name, email, phone number, address, and payment details.{"\n"}
          - Profile Information – Resume, skills, job preferences, and work history.{"\n"}
          - Usage Data – Device information, IP address, login activity, and browsing behavior.{"\n"}
          - Payment Information – Payment processing details for transactions between employers and employees.
        </Text>

        <Text style={styles.sectionText}>
          3. <Text style={styles.bold}>How We Use Your Information</Text>{"\n"}
          - Facilitate job connections between employers and employees.{"\n"}
          - Process payments and track hourly charges.{"\n"}
          - Improve app functionality and user experience.{"\n"}
          - Communicate with users about job postings, payments, and security updates.{"\n"}
          - Prevent fraud and ensure compliance with UAE legal requirements.
        </Text>

        <Text style={styles.sectionText}>
          4. <Text style={styles.bold}>Sharing of Information</Text>{"\n"}
          - Employers and Employees – To facilitate job matching and hiring.{"\n"}
          - Payment Processors – For secure transactions following UAE financial regulations.{"\n"}
          - Legal Authorities – If required by UAE law or for fraud prevention.{"\n"}
          - Third-Party Services – For analytics, customer support, and app improvements.
        </Text>

        <Text style={styles.sectionText}>
          5. <Text style={styles.bold}>Data Security</Text>{"\n"}
          - We implement security measures to protect your data from unauthorized access or disclosure.{"\n"}
          - Our security practices comply with UAE cybersecurity laws.{"\n"}
          - However, no method of online transmission is 100% secure.
        </Text>

        <Text style={styles.sectionText}>
          6. <Text style={styles.bold}>Your Rights</Text>{"\n"}
          - Access, update, or delete your personal information.{"\n"}
          - Withdraw consent for data collection.{"\n"}
          - Request a copy of your stored data.
        </Text>

        <Text style={styles.sectionText}>
          7. <Text style={styles.bold}>Data Storage & Transfer</Text>{"\n"}
          - Your data is stored on secure servers and follows UAE data residency regulations.{"\n"}
          - If transferred outside the UAE, we ensure it meets equivalent data protection standards.
        </Text>

        <Text style={styles.sectionText}>
          8. <Text style={styles.bold}>Cookies & Tracking Technologies</Text>{"\n"}
          - We use cookies and tracking technologies to enhance user experience and analyze app performance.
        </Text>

        <Text style={styles.sectionText}>
          9. <Text style={styles.bold}>Changes to This Privacy Policy</Text>{"\n"}
          - We may update this policy from time to time.{"\n"}
          - Any changes will be posted on this page with an updated effective date.
        </Text>

        <Text style={styles.sectionText}>
          10. <Text style={styles.bold}>Contact Us</Text>{"\n"}
          - Email: support@sideapp.com{"\n"}
          - Address: Dubai Internet City, Dubai, UAE
        </Text>
      </ScrollView>

      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft:10,
    
    
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#0e0d0d",
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    color: "#002E5E",
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#002E5E",
        marginTop: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#002E5E",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
    
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default PrivacyPolicy;
