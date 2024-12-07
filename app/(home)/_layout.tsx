import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { dark, light } from "../../data/colors";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/UserContext";
import AuthPage from "../../components/AuthPage";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const colorTheme = theme === "light" ? light : dark
    const { user } = useAuth();

    // AsyncStorage.clear()

    if (user === null) return <AuthPage />

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colorTheme.tabActive,
                tabBarInactiveTintColor: colorTheme.tabInactive,
                tabBarStyle: {
                    backgroundColor: colorTheme.headerBackground,
                    borderColor: colorTheme.headerBackground,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerTitleStyle: {
                        color: colorTheme.headerText
                    },
                    headerStyle: {
                        backgroundColor: colorTheme.headerBackground,
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
                        color: colorTheme.headerText
                    },
                    headerStyle: {
                        backgroundColor: colorTheme.headerBackground,
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
                            <Ionicons name="add-circle" size={40} color={colorTheme.addTradeButton} />
                        </Pressable>
                    ),
                }}
            />
            <Tabs.Screen
                name="strategies"
                options={{
                    title: "Strategies",
                    headerTitleStyle: {
                        color: colorTheme.headerText
                    },
                    headerStyle: {
                        backgroundColor: colorTheme.headerBackground,
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
                        color: colorTheme.headerText
                    },
                    headerStyle: {
                        backgroundColor: colorTheme.headerBackground,
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