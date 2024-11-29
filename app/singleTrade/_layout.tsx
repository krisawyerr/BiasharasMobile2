import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"

export default function SingleTradeLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="[id]"
                options={({ navigation }) => ({
                    title: "Trade Details",
                    headerTitleStyle: {
                        color: "#ccc3cc"
                    },
                    headerStyle: {
                        backgroundColor: "#342e36",
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={24} color='#ccc3cc' />
                        </TouchableOpacity>
                    )
                })}
            />
        </Stack>
    )
}