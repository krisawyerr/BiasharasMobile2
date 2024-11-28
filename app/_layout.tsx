import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image, StatusBar, Modal, View, Text, TouchableOpacity, Button } from "react-native";
import { useState } from "react";

import { useNavigation } from '@react-navigation/native';

export default function RootLayout() {
    const navigation = useNavigation();

    return (
        <>
            <StatusBar />
            <Stack>
                <Stack.Screen 
                    name="(home)" 
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="singleTrade" 
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="editTrade" 
                    options={{
                        headerShown: false,
                        presentation: "modal"
                    }}
                />
                <Stack.Screen 
                    name="addTrade" 
                    options={{
                        title: "Add Item",
                        headerTitleStyle: {
                            color: "#ccc3cc"
                        },
                        headerStyle: {
                            backgroundColor: "#342e36",
                        },
                        presentation: "modal"
                    }}
                />
            </Stack>
        </>
    );
}
