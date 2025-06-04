import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card, useTheme, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notification = () => {
  const { colors } = useTheme();

  const latestNotifications = [
    { id: '1', message: 'Ambulance dispatched to Location A.' },
    { id: '2', message: 'Route cleared on NH-45.' },
  ];

  const previousNotifications = [
    { id: '3', message: 'Driver 101 completed the trip.' },
    { id: '4', message: 'New ambulance added to fleet.' },
  ];

  const renderNotificationCard = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: colors.boxBackground }]} elevation={2}>
      <Card.Content>
        <Text style={[styles.messageText, { color: colors.text }]}>{item.message}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.primary }]}>Notifications</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.icon }]}>Latest</Text>
        <FlatList
          data={latestNotifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotificationCard}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.icon }]}>Previous</Text>
        <FlatList
          data={previousNotifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotificationCard}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    padding: 10,
  },
  messageText: {
    fontSize: 15,
  },
  divider: {
    marginVertical: 8,
  },
});

export default Notification;
