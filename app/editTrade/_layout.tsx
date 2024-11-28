import { Stack } from "expo-router";

export default function EditTradeLayout() {
    return (
        <Stack>
            <Stack.Screen 
                name="[id]"
                options={{
                    title: "Edit Trade",
                    headerTitleStyle: {
                        color: "#ccc3cc"
                    },
                    headerStyle: {
                        backgroundColor: "#342e36",
                    },
                }}
            />
        </Stack>
    )
}