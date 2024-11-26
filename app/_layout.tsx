import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { StatusBar } from "react-native";

export default function RootLayout() {
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
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            return <Ionicons name="home" size={30} color={color} />;
                        },
                        tabBarShowLabel: false
                    }}
                />
                <Tabs.Screen 
                    name="search" 
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            return <Ionicons name="search" size={30} color={color} />;
                        },
                        tabBarShowLabel: false
                    }}
                />
                <Tabs.Screen 
                    name="post" 
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            return <Ionicons name="add-circle" size={30} color={color} />;
                        },
                        tabBarShowLabel: false
                    }}
                />
                <Tabs.Screen 
                    name="activity"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            return <Ionicons name="heart" size={30} color={color} />;
                        },
                        tabBarShowLabel: false
                    }}
                />
                <Tabs.Screen 
                    name="profile" 
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            return <Ionicons name="person" size={30} color={color} />;
                        },
                        tabBarShowLabel: false
                    }}
                />
            </Tabs>
        </>
    )
}