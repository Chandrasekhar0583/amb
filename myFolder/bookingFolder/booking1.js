  // import React from 'react';
  // import { useNavigation } from '@react-navigation/native';
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
  //   const movetohospital=(title)=>{
  //     navigation.navigate("Choose Hospital",{title});
  //   }

  //   const renderItem = ({ item }) => (
  //     <TouchableOpacity style={styles.b1_item} onPress={() => movetohospital(item.title)}>
  //       <Text style={styles.b1_itemText}>{item.title}</Text>
  //       <Ionicons name="chevron-forward-outline" size={20} color="#333" />
  //     </TouchableOpacity>
  //   );

  //   return (
  //     <View style={styles.b1_container}>
  //       <View style={styles.b1_card}>
  //         <FlatList
  //           data={emergencyData}
  //           renderItem={renderItem}
  //           keyExtractor={(item) => item.id}
  //         />
  //       </View>
  //     </View>
  //   );
  // };

  // export default BookingAmb1;

  // const styles = StyleSheet.create({
  //   b1_container: {
  //     width: "100%",
  //     backgroundColor: '#f0f0f5',
  //     alignItems: 'center',
  //     paddingVertical: 30,
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
  //   b1_item: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     paddingVertical: 15,
  //     borderBottomWidth: 1,
  //     borderColor: '#eee',
  //   },
  //   b1_itemText: {
  //     fontSize: 16,
  //     color: '#333',
  //   },
  // });

// import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
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
//   const [selectedTitle, setSelectedTitle] = useState(null);

//   const handleSelect = (title) => {
//     setSelectedTitle(title);
//   };

//   const handleNext = () => {
//     if (selectedTitle) {
//       navigation.navigate("Choose Hospital", { title: selectedTitle });
//     }
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.b1_item,
//         selectedTitle === item.title && styles.b1_itemSelected
//       ]}
//       onPress={() => handleSelect(item.title)}
//     >
//       <Text
//         style={[
//           styles.b1_itemText,
//           selectedTitle === item.title && styles.b1_itemTextSelected
//         ]}
//       >
//         {item.title}
//       </Text>
//       <Ionicons
//         name="chevron-forward-outline"
//         size={20}
//         color={selectedTitle === item.title ? "#007BFF" : "#333"}
//       />
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.b1_container}>
//       <View style={styles.b1_card}>
//         <FlatList
//           data={emergencyData}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//         />
//         <TouchableOpacity
//           onPress={handleNext}
//           disabled={!selectedTitle}
//           style={[
//             styles.b1_nextButton,
//             !selectedTitle ? styles.b1_nextButtonDisabled : styles.b1_nextButtonActive
//           ]}
//         >
//           <Text style={styles.b1_nextButtonText}>
//             Next
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default BookingAmb1;

// const styles = StyleSheet.create({
//   b1_container: {
//     width: "100%",
//     backgroundColor: '#f0f0f5',
//     alignItems: 'center',
//     paddingVertical: 30,
//     flex: 1,
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
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   b1_item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//   },
//   b1_itemSelected: {
//     backgroundColor: '#e6f0ff',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   b1_itemText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   b1_itemTextSelected: {
//     color: '#007BFF',
//     fontWeight: 'bold',
//   },
//   b1_nextButton: {
//     marginTop: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   b1_nextButtonActive: {
//     backgroundColor: '#007BFF',
//   },
//   b1_nextButtonDisabled: {
//     backgroundColor: '#ccc',
//   },
//   b1_nextButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });



import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

const emergencyData = [
  { id: '1', title: 'Accident' },
  { id: '2', title: 'Pregnancy' },
  { id: '3', title: 'Heart attack' },
  { id: '4', title: 'Stroke' },
  { id: '5', title: 'Burns' },
];

const BookingAmb1 = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [selectedTitle, setSelectedTitle] = useState(null);

  const handleSelect = (title) => {
    setSelectedTitle(title);
  };

  const handleNext = () => {
    if (selectedTitle) {
      navigation.navigate("Choose Hospital", { title: selectedTitle });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.b1_item,
        { borderColor: colors.border },
        selectedTitle === item.title && {
          backgroundColor: colors.primaryContainer , // fallback color
          paddingHorizontal: 10,
          borderRadius: 8,
        }
      ]}
      onPress={() => handleSelect(item.title)}
    >
      <Text
        style={[
          styles.b1_itemText,
          { color: colors.onSurface },
          selectedTitle === item.title && {
            color: colors.primary,
            fontWeight: 'bold',
          }
        ]}
      >
        {item.title}
      </Text>
      <Ionicons
        name="chevron-forward-outline"
        size={20}
        color={selectedTitle === item.title ? colors.primary : colors.background }
      />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.b1_container, { backgroundColor: colors.background }]}>
      <View style={[styles.b1_card, { backgroundColor: colors.surface }]}>
        <FlatList
          data={emergencyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity
          onPress={handleNext}
          disabled={!selectedTitle}
          style={[
            styles.b1_nextButton,
            {
              backgroundColor: selectedTitle ? colors.primary : colors.disabled,
            }
          ]}
        >
          <Text style={[styles.b1_nextButtonText, { color: colors.onPrimary }]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingAmb1;

const styles = StyleSheet.create({
  b1_container: {
    width: "100%",
    alignItems: 'center',
    paddingVertical: 30,
    flex: 1,
  },
  b1_card: {
    width: '85%',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 8,
    flex: 1,
    justifyContent: 'space-between',
  },
  b1_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  b1_itemText: {
    fontSize: 16,
  },
  b1_nextButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  b1_nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
