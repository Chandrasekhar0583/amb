import React from 'react';
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

  const movetohospital = (title) => {
    navigation.navigate("Choose Hospital", { title });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.b1_item, { borderColor: colors.border }]} onPress={() => movetohospital(item.title)}>
      <Text style={[styles.b1_itemText, { color: colors.text }]}>{item.title}</Text>
      <Ionicons name="chevron-forward-outline" size={20} color={colors.icon} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.b1_container, { backgroundColor: colors.background }]}>
      <View style={[styles.b1_card, { backgroundColor: colors.background }]}>
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

const styles = StyleSheet.create({
  b1_container: {
    width: "100%",
    alignItems: 'center',
    paddingVertical: 30,
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
});
