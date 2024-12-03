import { Stack, Tabs } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import { dark } from "../data/colors";

export default function RootLayout() {
    const theme = useColorScheme();
    console.log(theme)

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
                            color: dark.headerText
                        },
                        headerStyle: {
                            backgroundColor: dark.headerBackground,
                        },
                        presentation: "modal"
                    }}
                />
            </Stack>
        </>
    );
}
