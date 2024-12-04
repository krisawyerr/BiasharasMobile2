import { Stack, Tabs } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import { dark, light } from "../data/colors";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

export default function RootLayout() {
    return (
        <ThemeProvider>
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
                    name="singleStrategy"
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
                    name="editStrategy"
                    options={{
                        headerShown: false,
                        presentation: "modal"
                    }}
                />
                <Stack.Screen
                    name="addTrade"
                    options={{
                        title: "Add Trade",
                        presentation: "modal"
                    }}
                />
                <Stack.Screen
                    name="addStrategy"
                    options={{
                        title: "Add Strategy",
                        presentation: "modal"
                    }}
                />
            </Stack>
        </ThemeProvider>
    );
}
