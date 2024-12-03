import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { dark } from "../../data/colors";

export default function RootLayout() {
    const navigation = useNavigation();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: dark.tabActive,
                tabBarInactiveTintColor: dark.tabInactive,
                tabBarStyle: {
                    backgroundColor: dark.headerBackground,
                    borderColor: dark.headerBackground,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerTitleStyle: {
                        color: dark.headerText
                    },
                    headerStyle: {
                        backgroundColor: dark.headerBackground,
                        borderBottomWidth: 0,
                        shadowOpacity: 0,
                        elevation: 0,
                    },
                    tabBarIcon: ({ focused, color }) => {
                        return <Ionicons name={focused ? "home" : "home-outline"} size={29} color={color} />;
                    },
                }}
            />
            <Tabs.Screen
                name="trades"
                options={{
                    title: "Trades",
                    headerTitleStyle: {
                        color: dark.headerText
                    },
                    headerStyle: {
                        backgroundColor: dark.headerBackground,
                        borderBottomWidth: 0,
                        shadowOpacity: 0,
                        elevation: 0,
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name={focused ? "clipboard" : "clipboard-outline"} size={29} color={color} />;
                    },
                }}
            />
            <Tabs.Screen
                name="addTrade"
                options={{
                    tabBarButton: () => (
                        <Pressable style={styles.postButton} onPress={() => navigation.navigate('addTrade')}>
                            <Ionicons name="add-circle" size={40} color={dark.addTradeButton} />
                        </Pressable>
                    ),
                }}
            />
            <Tabs.Screen
                name="strategies"
                options={{
                    title: "Strategies",
                    headerTitleStyle: {
                        color: dark.headerText
                    },
                    headerStyle: {
                        backgroundColor: dark.headerBackground,
                        borderBottomWidth: 0,
                        shadowOpacity: 0,
                        elevation: 0,
                    },
                    tabBarIcon: ({ focused, color }) => {
                        return <Ionicons name={focused ? "bulb" : "bulb-outline"} size={29} color={color} />;
                    },
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Setting",
                    headerTitleStyle: {
                        color: dark.headerText
                    },
                    headerStyle: {
                        backgroundColor: dark.headerBackground,
                        borderBottomWidth: 0,
                        shadowOpacity: 0,
                        elevation: 0,
                    },
                    tabBarIcon: ({ focused, color }) => {
                        return <Ionicons name={focused ? "settings" : "settings-outline"} size={29} color={color} />;
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