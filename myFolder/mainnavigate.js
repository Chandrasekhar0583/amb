import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeAMB from "./myhome";
import BookingAMBMAIN from "./bookingFolder/bookingMain";
import Notification from "./Notifications"; 
import Routesetting from "./RouteSetting";
import { SafeAreaView } from "react-native-safe-area-context";

const MyMainNavigate = () => {
    const Tab = createBottomTabNavigator();

    return (
        // <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer style={{ flex: 1 }}>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: true,
                    }}>
                    <Tab.Screen name="Home" component={HomeAMB} />
                    <Tab.Screen name="Booking" component={BookingAMBMAIN} />
                    <Tab.Screen name="Notification" component={Notification} />
                    <Tab.Screen name="RouteSetting" component={Routesetting} />
                </Tab.Navigator>
            </NavigationContainer>
        // </SafeAreaView>
    );
}

export default MyMainNavigate;