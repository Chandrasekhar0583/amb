import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, useTheme, Divider } from 'react-native-paper';

const DetailsScreen = ({ route }) => {
  const { startCoords, endCoords, drivingNumber } = route.params;
  const { colors } = useTheme();

  // Mock values – replace with real API results if needed
  const mockDistance = '7.5 km';
  const mockETA = '12 mins';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Card style={styles.card}>
        <Card.Title title="Route Details" titleStyle={styles.title} />
        <Card.Content>
          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.label}>Driving Number:</Text>
            <Text style={styles.value}>{drivingNumber}</Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.label}>Start Coordinates:</Text>
            <Text style={styles.value}>
              {startCoords.latitude.toFixed(5)}, {startCoords.longitude.toFixed(5)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.label}>End Coordinates:</Text>
            <Text style={styles.value}>
              {endCoords.latitude.toFixed(5)}, {endCoords.longitude.toFixed(5)}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.label}>Estimated Distance:</Text>
            <Text style={styles.value}>{mockDistance}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.label}>Estimated Time:</Text>
            <Text style={styles.value}>{mockETA}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    elevation: 3,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 10,
  },
  label: {
    fontWeight: '600',
    color: '#777',
  },
  value: {
    fontSize: 16,
    marginTop: 2,
  },
  divider: {
    marginVertical: 10,
  },
});

export default DetailsScreen;
