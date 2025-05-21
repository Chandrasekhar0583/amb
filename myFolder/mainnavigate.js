import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeAMB from "./myhome";
import BookingAMBMAIN from "./bookingFolder/bookingMain";
import Notification from "./Notifications";
// import Routesetting from "./RouteSetting";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/FontAwesome6";
import { useTheme } from "react-native-paper";
import RouteNavigator from "./routeFolder/routeSettingNavigator";

const MyMainNavigate = () => {
    const Tab = createBottomTabNavigator();
    const { colors } = useTheme();

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: colors.icon,
                    tabBarInactiveTintColor: colors.text,
                    tabBarStyle: {
                        backgroundColor: colors.tabBarBackground,
                        borderTopWidth: 0,
                        elevation: 0,
                        height: 77,
                        paddingBottom: 10,
                        paddingTop: 5,
                        alignItems: "center",
                        justifyContent: "center"
                    },

                    tabBarLabelStyle: {
                        fontSize: 15,
                    },
                    tabBarIcon: ({ focused, color }) => {
                        if (route.name === "RouteSetting") {
                            return <Icon1 name="route" color={color} size={27} />;
                        }

                        let iconname = "";
                        if (route.name === "Home") {
                            iconname = focused ? "home" : "home-outline";
                        } else if (route.name === "Booking") {
                            iconname = focused ? "calendar-sharp" : "calendar-outline";
                        } else if (route.name === "Notification") {
                            iconname = focused ? "notifications" : "notifications-outline";
                        }

                        return <Icon name={iconname} color={color} size={27} />;
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeAMB} />
                <Tab.Screen name="Booking" component={BookingAMBMAIN} />
                <Tab.Screen name="Notification" component={Notification} />
                <Tab.Screen name="RouteSetting" component={RouteNavigator} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default MyMainNavigate;
