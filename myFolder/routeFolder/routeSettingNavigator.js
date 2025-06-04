import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import RouteInputScreen from './RouteInputScreen';
import MapScreen from './MapScreen';
import DetailsScreen from './DetailsScreen';
import MapPickerScreen from './MapPickerScreen';
const Stack = createStackNavigator();

export default function RouteNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#E8B3BC' },
        headerTintColor: '#3E764B',
      }}
    >
      <Stack.Screen name="RouteInput" component={RouteInputScreen} options={{ title: 'Route' }} />
      <Stack.Screen name="MapPicker" component={MapPickerScreen} />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerLeft: () => null,      
          gestureEnabled: false,       
        }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
