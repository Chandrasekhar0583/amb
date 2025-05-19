import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";  
import { createStackNavigator } from "@react-navigation/stack";

import BookingAmb2 from "./booking2";
import BookingAmb1 from "./booking1";
import BookingAmb3 from "./booking3";
import BookingAmb4 from "./booking4";


const BookingAMBMAIN = () => {
    const Stack = createStackNavigator();

    return (
        // <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator 
                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                <Stack.Screen name="BookingAMB1" component={BookingAmb1} />
                <Stack.Screen name="BookingAMB2" component={BookingAmb2} />
                <Stack.Screen name="BookingAMB3" component={BookingAmb3} />
                <Stack.Screen name="BookingAMB4" component={BookingAmb4} />
                
            </Stack.Navigator>
        // </SafeAreaView>
    );
}
export default BookingAMBMAIN;