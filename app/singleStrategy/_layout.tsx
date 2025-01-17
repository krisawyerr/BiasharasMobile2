import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { dark, light } from "../../data/colors";
import { useTheme } from "../../context/ThemeContext";

export default function SingleStrategyLayout() {
    const { theme } = useTheme();
    const colorTheme = theme === "light" ? light : dark

    return (
        <Stack>
            <Stack.Screen
                name="[id]"
                options={({ navigation }) => ({
                    title: "Strategy Details",
                    headerTitleStyle: {
                        color: colorTheme.headerText
                    },
                    headerStyle: {
                        backgroundColor: colorTheme.headerBackground,
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={24} color={colorTheme.headerText} />
                        </TouchableOpacity>
                    )
                })}
            />
        </Stack>
    )
}