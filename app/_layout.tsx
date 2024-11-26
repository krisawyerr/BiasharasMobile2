import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

export default function RootLayout() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <StatusBar />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        backgroundColor: "#181818",
                        borderColor: "#181818"
                    },
                }}
            >
                <Tabs.Screen 
                    name="index"
                    options={{
                        headerTitle: () => {
                            return (
                                <Image source={require('../assets/logoWhite.png')} style={{height: 40, width: 40}}/>
                            )
                        },
                        headerStyle: {
                            backgroundColor: "#181818",
                            height: 100,
                            borderBottomWidth: 0, 
                            shadowOpacity: 0,
                            elevation: 0, 
                        },
                        tabBarIcon: ({ focused, color, size }) => {
                            return <Ionicons name={focused ? "home" : "home-outline"} size={30} color={color} />;
                        },
                        tabBarShowLabel: false
                    }}
                />
                <Tabs.Screen 
                    name="statistics" 
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            return <Ionicons name={focused ? "bar-chart" : "bar-chart-outline"} size={30} color={color} />;
                        },
                        tabBarShowLabel: false
                    }}
                />
                <Tabs.Screen 
                    name="post" 
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            return <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={30} color={color} />;
                        },
                        tabBarShowLabel: false
                    }}
                />
                <Tabs.Screen 
                    name="strategies"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            return <Ionicons name={focused ? "bulb" : "bulb-outline"} size={30} color={color} />;
                        },
                        tabBarShowLabel: false
                    }}
                />
                <Tabs.Screen 
                    name="profile" 
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            return <Ionicons name={focused ? "person" : "person-outline"} size={30} color={color} />;
                        },
                        tabBarShowLabel: false
                    }}
                />
            </Tabs>
        </>
    )
}