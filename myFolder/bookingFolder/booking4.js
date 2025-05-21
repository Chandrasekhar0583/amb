// // BookingAmb3.js

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const BookingAmb4 = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>BookingAmb3 Page</Text>
//       <Text style={styles.text}>This is a basic screen for BookingAmb3.</Text>
//     </View>
//   );
// };

// export default BookingAmb4;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   text: {
//     fontSize: 16,
//     color: '#333',
//   },
// });


import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';

const HospitalDetails = ({ route }) => {
  const { hospitalName } = route.params;

  const hospitalDetailsMap = {
    'Sunshine Hospital': {
      address: 'Plot No. 8-1-21, P.V. Narasimha Rao Expressway, Hyderabad, Telangana - 500034',
      phone: '+91 40 1234 5678',
      email: 'contact@sunshinehospitals.com',
      timings: '24/7 Emergency | Outpatient: 9 AM - 6 PM',
      specialties: ['Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics'],
      facilities: ['ICU', 'MRI', 'CT Scan', 'Pharmacy', 'Cafeteria'],
      website: 'https://www.sunshinehospitals.com'
    },
    'Apollo Hospital': {
      address: 'Road No 72, Jubilee Hills, Hyderabad, Telangana - 500033',
      phone: '+91 40 9876 5432',
      email: 'info@apollohospitals.com',
      timings: 'Emergency: 24/7 | OPD: 8 AM - 8 PM',
      specialties: ['Cardiology', 'Oncology', 'Dermatology', 'Gynecology'],
      facilities: ['Blood Bank', '24x7 Ambulance', 'ICU', 'Diagnostics'],
      website: 'https://www.apollohospitals.com'
    }
  };

  const hospital = hospitalDetailsMap[hospitalName] || {
    address: 'Not Available',
    phone: 'Not Available',
    email: 'Not Available',
    timings: 'Not Available',
    specialties: [],
    facilities: [],
    website: 'N/A'
  };

  return (
    <ScrollView style={styles.b5_container}>
      <Text style={styles.b5_title}>🏥 {hospitalName}</Text>

      <View style={styles.b5_section}>
        <Text style={styles.b5_label}>📍 Address</Text>
        <Text style={styles.b5_value}>{hospital.address}</Text>
      </View>

      <View style={styles.b5_section}>
        <Text style={styles.b5_label}>📞 Phone</Text>
        <Text style={styles.b5_value}>{hospital.phone}</Text>
      </View>

      <View style={styles.b5_section}>
        <Text style={styles.b5_label}>📧 Email</Text>
        <Text style={styles.b5_value}>{hospital.email}</Text>
      </View>

      <View style={styles.b5_section}>
        <Text style={styles.b5_label}>⏰ Timings</Text>
        <Text style={styles.b5_value}>{hospital.timings}</Text>
      </View>

      <View style={styles.b5_section}>
        <Text style={styles.b5_label}>🩺 Specialties</Text>
        {hospital.specialties.map((item, index) => (
          <Text key={index} style={styles.b5_value}>• {item}</Text>
        ))}
      </View>

      <View style={styles.b5_section}>
        <Text style={styles.b5_label}>🏥 Facilities</Text>
        {hospital.facilities.map((item, index) => (
          <Text key={index} style={styles.b5_value}>• {item}</Text>
        ))}
      </View>

      <View style={styles.b5_section}>
        <Text style={styles.b5_label}>🌐 Website</Text>
        {hospital.website !== 'N/A' ? (
          <TouchableOpacity onPress={() => Linking.openURL(hospital.website)}>
            <Text style={styles.b5_link}>{hospital.website}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.b5_value}>Not Available</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default HospitalDetails;

const styles = StyleSheet.create({
  b5_container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  b5_title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  b5_section: {
    marginBottom: 18,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  b5_label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#007BFF',
  },
  b5_value: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  b5_link: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
});
