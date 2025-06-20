import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";

import BookingAmb1 from "./booking1";
import BookingAmb2 from "./booking2";
import BookingAmb3 from "./booking3";
import BookingAmb4 from "./booking4";

const BookingAMBMAIN = () => {
  const Stack = createStackNavigator();
  const { colors } = useTheme();

    return (
        // <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator 
                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                <Stack.Screen name="What's the emergency?" component={BookingAmb1} />
                <Stack.Screen name="Choose Hospital" component={BookingAmb2} />
                <Stack.Screen name="Direction" component={BookingAmb3} />
                <Stack.Screen name="HospitalDetails" component={BookingAmb4} />
                
            </Stack.Navigator>
        // </SafeAreaView>
    );
}
export default BookingAMBMAIN;
