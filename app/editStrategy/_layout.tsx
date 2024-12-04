import { Stack } from "expo-router";
import { dark, light } from "../../data/colors";
import { useColorScheme } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function EditTradeLayout() {
    const { theme } = useTheme();
    const colorTheme = theme === "light" ? light : dark

    return (
        <Stack>
            <Stack.Screen
                name="[id]"
                options={{
                    title: "Edit Strategy",
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