import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image, StatusBar, Modal, View, Text, TouchableOpacity, Button, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

import { useNavigation } from '@react-navigation/native';

export default function RootLayout() {
    const navigation = useNavigation();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#02b5ff",
                tabBarInactiveTintColor: "#838283",
                tabBarStyle: {
                    backgroundColor: "#342e36",
                    borderColor: "#342e36",
                },
            }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Home",
                    headerTitleStyle: {
                        color: "#ccc3cc"
                    },
                    headerStyle: {
                        backgroundColor: "#342e36",
                        borderBottomWidth: 0, 
                        shadowOpacity: 0,
                        elevation: 0, 
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name={focused ? "home" : "home-outline"} size={30} color={color} />;
                    },
                }}
            />
            <Tabs.Screen 
                name="statistics" 
                options={{
                    title: "Statistics",
                    headerTitleStyle: {
                        color: "#ccc3cc"
                    },
                    headerStyle: {
                        backgroundColor: "#342e36",
                        borderBottomWidth: 0, 
                        shadowOpacity: 0,
                        elevation: 0, 
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name={focused ? "bar-chart" : "bar-chart-outline"} size={30} color={color} />;
                    },
                }}
            />
            <Tabs.Screen 
                name="addTrade" 
                options={{
                    tabBarButton: () => (
                        <Pressable style={styles.postButton} onPress={() => navigation.navigate('addTrade')}>
                            <Ionicons name="add-circle" size={40} color="#d466e3" />
                        </Pressable>
                    ),
                }}
            />
            <Tabs.Screen 
                name="strategies"
                options={{
                    title: "Strategies",
                    headerTitleStyle: {
                        color: "#ccc3cc"
                    },
                    headerStyle: {
                        backgroundColor: "#342e36",
                        borderBottomWidth: 0, 
                        shadowOpacity: 0,
                        elevation: 0, 
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name={focused ? "bulb" : "bulb-outline"} size={30} color={color} />;
                    },
                }}
            />
            <Tabs.Screen 
                name="profile" 
                options={{
                    title: "Setting",
                    headerTitleStyle: {
                        color: "#ccc3cc"
                    },
                    headerStyle: {
                        backgroundColor: "#342e36",
                        borderBottomWidth: 0, 
                        shadowOpacity: 0,
                        elevation: 0, 
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name={focused ? "settings" : "settings-outline"} size={30} color={color} />;
                    },
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    postButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});