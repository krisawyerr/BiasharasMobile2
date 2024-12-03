import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { dark } from "../../data/colors";

export default function SingleTradeLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="[id]"
                options={({ navigation }) => ({
                    title: "Trade Details",
                    headerTitleStyle: {
                        color: dark.headerText
                    },
                    headerStyle: {
                        backgroundColor: dark.headerBackground,
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={24} color={dark.headerText} />
                        </TouchableOpacity>
                    )
                })}
            />
        </Stack>
    )
}