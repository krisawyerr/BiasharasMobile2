import { Stack, Tabs } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import { dark, light } from "../data/colors";

export default function RootLayout() {
    const theme = useColorScheme();
    const colorTheme = theme === "light" ? light : dark

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
                            color: colorTheme.headerText
                        },
                        headerStyle: {
                            backgroundColor: colorTheme.headerBackground,
                        },
                        presentation: "modal"
                    }}
                />
            </Stack>
        </>
    );
}
