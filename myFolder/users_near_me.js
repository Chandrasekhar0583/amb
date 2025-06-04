import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import haversine from 'haversine';

const centerPoint = {
  latitude: 17.385044,  // Example: Hyderabad
  longitude: 78.486671,
};

const generateRandomUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const latOffset = (Math.random() - 0.5) * 0.05;
    const lngOffset = (Math.random() - 0.5) * 0.05;
    users.push({
      id: i + 1,
      name: `User ${i + 1}`,
      latitude: centerPoint.latitude + latOffset,
      longitude: centerPoint.longitude + lngOffset,
    });
  }
  return users;
};

const filterUsersByRadius = (users, radiusKm) => {
  return users.filter(user => {
    const start = { latitude: user.latitude, longitude: user.longitude };
    return haversine(centerPoint, start, { unit: 'km' }) <= radiusKm;
  });
};

function Users_near_me() {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const generated = generateRandomUsers(20);
    setAllUsers(generated);
    setFilteredUsers(generated);
  }, []);

  const handleRadiusFilter = (radius) => {
    const result = filterUsersByRadius(allUsers, radius);
    setFilteredUsers(result);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, padding: 10 }}>Nearby Users (Pins)</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
        <Button title="2 km" onPress={() => handleRadiusFilter(2)} />
        <Button title="4 km" onPress={() => handleRadiusFilter(4)} />
        <Button title="6 km" onPress={() => handleRadiusFilter(6)} />
      </View>

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: centerPoint.latitude,
          longitude: centerPoint.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Center Location Pin */}
        <Marker
          coordinate={centerPoint}
          title="You are here"
          pinColor="blue"
        />

        {/* Nearby User Pins */}
        {filteredUsers.map(user => (
          <Marker
            key={user.id}
            coordinate={{ latitude: user.latitude, longitude: user.longitude }}
            title={user.name}
          />
        ))}
      </MapView>
    </View>
  );
}

export default Users_near_me;