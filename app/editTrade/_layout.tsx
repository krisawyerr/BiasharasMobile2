import { Stack } from "expo-router";
import { dark } from "../../data/colors";

export default function EditTradeLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="[id]"
                options={{
                    title: "Edit Trade",
                    headerTitleStyle: {
                        color: dark.headerText
                    },
                    headerStyle: {
                        backgroundColor: dark.headerBackground,
                    },
                }}
            />
        </Stack>
    )
}