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
                    name="postPage" 
                    options={{
                        headerShown: false,
                        presentation: "modal"
                    }}
                />
            </Stack>
        </>
    );
}
