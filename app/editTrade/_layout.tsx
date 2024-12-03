import { Stack } from "expo-router";
import { dark, light } from "../../data/colors";
import { useColorScheme } from "react-native";

export default function EditTradeLayout() {
    const theme = useColorScheme();
    const colorTheme = theme === "light" ? light : dark

    return (
        <Stack>
            <Stack.Screen
                name="[id]"
                options={{
                    title: "Edit Trade",
                    headerTitleStyle: {
                        color: colorTheme.headerText
                    },
                    headerStyle: {
                        backgroundColor: colorTheme.headerBackground,
                    },
                }}
            />
        </Stack>
    )
}