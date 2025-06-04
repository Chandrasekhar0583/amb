import React, { useState } from 'react';
// import { Text, View } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

const HomeAMB = () => {
  const reviews = [
  {
    name: 'Sarah Johnson',
    date: 'May 15, 2025',
    stars: 5,
    text: 'The ambulance arrived within minutes. The paramedics were professional and caring. Excellent service!',
  },
  {
    name: 'Alex Smith',
    date: 'May 12, 2025',
    stars: 4,
    text: 'Quick service, but the driver missed the first location pin.',
  },
  {
    name: 'Priya Das',
    date: 'May 10, 2025',
    stars: 5,
    text: 'Amazing service! They even helped us calm down in a tense moment.',
  },
  {
    name: 'John Doe',
    date: 'May 5, 2025',
    stars: 3,
    text: 'Good but the ambulance took 20 minutes to arrive.',
  },
];
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < reviews.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const currentReview = reviews[currentIndex];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={styles.hm_container}>
      
      {/* Greeting */}
      <Text style={styles.hm_greeting}><Text style={styles.hm_bold}>Hello, John</Text></Text>
      <Text style={styles.hm_subtext}>Need medical assistance?</Text>

      {/* Book Now Button */}
      <TouchableOpacity style={styles.hm_bookNowBtn} onPress={()=>navigation.navigate("Booking")}>
        <Ionicons name="medkit" size={18} color="white" />
        <Text style={styles.hm_bookNowText}>BOOK NOW</Text>
      </TouchableOpacity>
      <Text style={styles.hm_smallText}>Tap for immediate emergency assistance</Text>

      {/* Your Location */}
      <View style={styles.hm_card}>
        <View style={styles.hm_sectionHeader}>
          <Ionicons name="location-outline" size={16} color="#e74c3c" />
          <Text style={styles.hm_sectionTitle}>Your Location</Text>
        </View>

        <View style={styles.hm_mapView}>
          <Ionicons name="navigate" size={40} color="#ccc" />
          <Text style={{ color: "#999", marginTop: 8 }}>Map View</Text>
        </View>

        <View style={styles.hm_locationInputContainer}>
          <TextInput
            placeholder="123 Main St. New York"
            style={styles.hm_input}
            placeholderTextColor="#555"
          />
          <TouchableOpacity>
            <Ionicons name="send" size={20} color="#007BFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.hm_enableText}>Enable location services for accurate positioning</Text>
      </View>

      {/* Customer Reviews */}
    <View style={styles.hm_rev_container}>
      <Text style={styles.hm_rev_title}>Customer Reviews</Text>
      <View style={styles.hm_rev_reviewCard}>
        <View style={styles.hm_rev_header}>
          <Text style={styles.hm_rev_name}>{currentReview.name}</Text>
          <Text style={styles.hm_rev_date}>{currentReview.date}</Text>
        </View>
        <Text style={styles.hm_rev_stars}>{"⭐".repeat(currentReview.stars)}</Text>
        <Text style={styles.hm_rev_reviewText}>{currentReview.text}</Text>
      </View>

      <View style={styles.hm_rev_pagination}>
        <TouchableOpacity onPress={handlePrev} disabled={currentIndex === 0}>
          <Ionicons name="chevron-back" size={24} color={currentIndex === 0 ? '#ccc' : '#333'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} disabled={currentIndex === reviews.length - 1}>
          <Ionicons name="chevron-forward" size={24} color={currentIndex === reviews.length - 1 ? '#ccc' : '#333'} />
        </TouchableOpacity>
      </View>
    </View>

      {/* Pagination Buttons */}
      {/* <View style={styles.hm_pagination}>
        <TouchableOpacity><Ionicons name="chevron-back" size={20} color="#333" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="chevron-forward" size={20} color="#333" /></TouchableOpacity>
      </View> */}

      {/* Recent Bookings */}
      <Text style={styles.hm_sectionTitle}>Recent Bookings</Text>
      <View style={styles.hm_bookingCard}>
        <MaterialIcons name="schedule" size={18} color="#555" />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.hm_bookingText}>123 Main St. New York</Text>
          <Text style={styles.hm_timeText}>Today at 09:30 AM</Text>
        </View>
        <Text style={styles.hm_status}>Completed</Text>
      </View>

      <View style={styles.hm_bookingCard}>
        <MaterialIcons name="schedule" size={18} color="#555" />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.hm_bookingText}>456 Park Ave, New York</Text>
          <Text style={styles.hm_timeText}>Yesterday at 03:15 PM</Text>
        </View>
        <Text style={styles.hm_status}>Completed</Text>
      </View>
    </ScrollView>
  );
};

export default HomeAMB;

const styles = StyleSheet.create({
  hm_container: {
    padding: 20,
    paddingBottom: 60,
  },
  hm_greeting: {
    fontSize: 22,
    marginBottom: 2,
  },
  hm_bold: {
    fontWeight: 'bold',
  },
  hm_subtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  hm_bookNowBtn: {
    flexDirection: 'row',
    backgroundColor: '#f78da7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 6,
  },
  hm_bookNowText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  hm_smallText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  hm_card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  hm_sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  hm_sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  hm_mapView: {
    height: 120,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hm_locationInputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  hm_input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  hm_enableText: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
  hm_reviewsCount: {
    marginLeft: 'auto',
    fontSize: 13,
    color: '#777',
  },
  hm_reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    marginBottom: 20,
  },
  hm_reviewerName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  hm_reviewDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
  hm_stars: {
    color: '#e74c3c',
    marginBottom: 6,
  },
  hm_reviewText: {
    fontSize: 14,
    color: '#333',
  },
  hm_pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  hm_bookingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f6f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  hm_bookingText: {
    fontWeight: '600',
    fontSize: 14,
  },
  hm_timeText: {
    fontSize: 12,
    color: '#777',
  },
  hm_status: {
    color: 'green',
    fontWeight: 'bold',
  },
  hm_rev_container: {
    marginTop: 30,
    alignItems: 'center',
  },
  hm_rev_title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  hm_rev_reviewCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    elevation: 4,
    width: '85%',
  },
  hm_rev_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hm_rev_name: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  hm_rev_date: {
    fontSize: 12,
    color: '#888',
  },
  hm_rev_stars: {
    fontSize: 16,
    marginTop: 6,
    color: '#f39c12',
  },
  hm_rev_reviewText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  hm_rev_pagination: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
});