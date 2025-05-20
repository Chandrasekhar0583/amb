// bookingAmb1.js

// import React from 'react';
// // import { View, Text, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useTheme, Button } from 'react-native-paper';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// const emergencyData = [
//   { id: '1', title: 'Accident' },
//   { id: '2', title: 'Pregnancy' },
//   { id: '3', title: 'Heart attack' },
//   { id: '4', title: 'Stroke' },
//   { id: '5', title: 'Burns' },
// ];


// const BookingAmb1 = () => {
//   const navigation = useNavigation();
//   const { colors } = useTheme();
//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.item} onPress={() => console.log(`Selected: ${item.title}`)}>
//       <Text style={styles.itemText}>{item.title}</Text>
//       <Ionicons name="chevron-forward-outline" size={20} color="#333" />
//     </TouchableOpacity>
//   );

//   return (
//     // <View style={[styles.container, { backgroundColor: colors.background }]}>
//     //   <Text style={styles.title}>BookingAmb1 Page</Text>
//     //   <Text style={styles.text}>This is a basic screen for BookingAmb1.</Text>
//     //   <Button
//     //     mode="contained"
//     //     onPress={() => navigation.navigate('BookingAMB2')}
//     //     style={{ marginTop: 20 }}
//     //   >
//     //     Go to BookingAmb2
//     //   </Button>
//     // </View>
//     <View style={styles.b1_container}>
//       <View style={styles.b1_card}>
//         {/* <Text style={styles.b1_heading}>Hospital</Text>
//         <Text style={styles.b1_subHeading}>What's the emergency?</Text> */}
//         <FlatList
//           data={emergencyData}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//         />
//         <TouchableOpacity style={styles.b1_viewAllButton} onPress={() => console.log('View all')}>
//           <Text style={styles.b1_viewAllText}>View all</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default BookingAmb1;

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const emergencyData = [
  { id: '1', title: 'Accident' },
  { id: '2', title: 'Pregnancy' },
  { id: '3', title: 'Heart attack' },
  { id: '4', title: 'Stroke' },
  { id: '5', title: 'Burns' },
];

const BookingAmb1 = () => {
  const navigation = useNavigation();
  const movetohospital=(title)=>{
    navigation.navigate("Choose Hospital",{title});
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.b1_item} onPress={() => movetohospital(item.title)}>
      <Text style={styles.b1_itemText}>{item.title}</Text>
      <Ionicons name="chevron-forward-outline" size={20} color="#333" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.b1_container}>
      <View style={styles.b1_card}>
        <FlatList
          data={emergencyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default BookingAmb1;


// const styles = StyleSheet.create({
//    b1_container: {
//     // flex: 1,
//     width:"100%",
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: '#f0f0f5',
//   },
//   b1_card: {
//     backgroundColor: '#fff',
//     width: '85%',
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 5 },
//     shadowRadius: 10,
//     elevation: 8,
//   },
//   b1_heading: {
//     fontSize: 16,
//     fontWeight: '600',
//     textAlign: 'center',
//     marginBottom: 10,
//     color: '#555',
//   },
//   b1_subHeading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   b1_item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//   },
//   b1_itemText: {
//     fontSize: 16,
//   },
//   b1_viewAllButton: {
//     marginTop: 20,
//     backgroundColor: '#ff4d4d',
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   b1_viewAllText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });


const styles = StyleSheet.create({
  b1_container: {
    width: "100%",
    backgroundColor: '#f0f0f5',
    alignItems: 'center',
    paddingVertical: 30,
  },
  b1_card: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 8,
  },
  b1_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  b1_itemText: {
    fontSize: 16,
    color: '#333',
  },
});
