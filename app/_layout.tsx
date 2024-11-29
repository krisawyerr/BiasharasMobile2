import { Stack, Tabs } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
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
