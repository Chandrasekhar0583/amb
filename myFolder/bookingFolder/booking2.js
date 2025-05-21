// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Button } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import { useTheme } from 'react-native-paper';
// import Icon from "react-native-vector-icons/Ionicons";

// const BookingAmb2 = ({ route}) => {
//     const navigation = useNavigation();
//     const { title } = route.params;
//     const { colors } = useTheme();
//   return (
//     <View style={[{backgroundColor:colors.background},styles.b3_container]}>
//       <View style={styles.b3_search}>
//         <View style={[styles.b3_innersearch]}>
//         <Text>Search here....!</Text>
//         <Icon name="search-outline" color="#fff" size={28} />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default BookingAmb2;

// const styles = StyleSheet.create({
//   b3_container: {
//     width:"100%",
//     flex:1,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: '#fff',
//   },
//   b3_search:{
//     height:150,
//     width:"90%",  
//     borderRadius:10,
//   }
// });


import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";

const hospitals = [
  { name: "Apollo Hospital", rating: 4.5},
  { name: "KIMS Hospital", rating: 4.2},
  { name: "Sunshine Hospital", rating: 4.7},
  { name: "Rainbow Hospital", rating: 4.1},
];

const BookingAmb2 = ({ route }) => {
  const navigation = useNavigation();
  const { title } = route.params;
  const { colors } = useTheme();

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [search, setSearch] = useState("");

  const handleNext = () => {
    if (accepted) {
      navigation.navigate("Direction", { hospital: selectedHospital });
    }
  };

  const filteredHospitals = hospitals.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.b3_container}>
        {/* <Text style={styles.b3_title}>{title}</Text> */}

        <View style={styles.b3_searchBar}>
          <TextInput
            placeholder="Search here..."
            placeholderTextColor="black"
            value={search}
            onChangeText={setSearch}
            style={styles.b3_searchInput}
          />
          <Icon name="search-outline" color="black" size={24}/>
        </View>

        <Text style={styles.b3_subtitle}>Choose a Hospital</Text>
        {filteredHospitals.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.b3_card,
              selectedHospital === item.name && styles.b3_selectedCard,
            ]}
            onPress={() => setSelectedHospital(item.name)}
          >
            <Text style={styles.b3_cardTitle}>{item.name}</Text>
            <Text>Rating: {item.rating} ⭐</Text>
          </TouchableOpacity>
        ))}

        {selectedHospital && (
          // <>
          //   <View style={styles.b3_termsContainer}>
          //     <Checkbox
          //       status={accepted ? "checked" : "unchecked"}
          //       onPress={() => setAccepted(!accepted)}
          //     />
          //     <Text style={styles.b3_termsText}>I agree to the terms and conditions.</Text>
          //   </View>

          //   <Button
          //     mode="contained"
          //     disabled={!accepted}
          //     onPress={handleNext}
          //     style={styles.b3_button}
          //   >
          //     Proceed
          //   </Button>
          // </>
          <>
    <View style={styles.b3_termsContainer}>
      <Checkbox
        status={accepted ? "checked" : "unchecked"}
        onPress={() => setAccepted(!accepted)}
      />
      <ScrollView style={styles.b3_termsScroll} nestedScrollEnabled>
        <Text style={styles.b3_termsTextTitle}>Terms and Conditions:</Text>
        <Text style={styles.b3_termsText}>• Hospital appointment timings are subject to availability.</Text>
        <Text style={styles.b3_termsText}>• Emergency cases will be prioritized over scheduled bookings.</Text>
        <Text style={styles.b3_termsText}>• Please carry a valid ID and your booking reference at the time of visit.</Text>
        <Text style={styles.b3_termsText}>• Cancellations must be made at least 24 hours before the appointment time.</Text>
        <Text style={styles.b3_termsText}>• The hospital reserves the right to modify your appointment slot based on internal policies.</Text>
        <Text style={[styles.b3_termsText, styles.b3_warningText]}>
          • Any fake or false emergency booking will lead to strict legal action.
        </Text>
      </ScrollView>
    </View>

    <Button
      mode="contained"
      disabled={!accepted}
      onPress={handleNext}
      style={styles.b3_button}
    >
      Proceed
    </Button>
  </>
        )}
      </View>
    </ScrollView>
  );
};

export default BookingAmb2;

const styles = StyleSheet.create({
  b3_container: {
    padding: 20,
  },
  b3_title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  b3_searchBar: {
    flexDirection: "row",
    backgroundColor:"rgb(255, 223, 249)",
    padding:5,
    color:"black",
    borderRadius:20,
    borderColor:"black",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  b3_searchInput: {
    flex: 1,
    color: "black",
    marginLeft:10,
    fontSize: 16,
  },
  b3_subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  b3_card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    marginBottom: 10,
  },
  b3_selectedCard: {
    backgroundColor: "#d0e8ff",
    borderColor: "#007BFF",
    borderWidth: 1.5,
  },
  b3_cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  b3_termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  b3_termsText: {
    fontSize: 14,
  },
  b3_button: {
    marginTop: 15,
  },
   b3_termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    maxHeight: 180,
  },
  b3_termsScroll: {
    flex: 1,
    marginLeft: 10,
  },
  b3_termsTextTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  b3_termsText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  b3_warningText: {
    color: '#d32f2f', // red color for warning
    fontWeight: 'bold',
  },
  b3_button: {
    marginTop:5,
    backgroundColor: '#007BFF',
    paddingVertical:1,
  },
});
