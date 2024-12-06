import { StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { dark, light } from "../data/colors";

export default function Loading() {
    const { theme } = useTheme();
    const colorTheme = theme === "light" ? light : dark

    return (
        <View style={[styles.page, { backgroundColor: colorTheme.bodyBackground }]}></View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 15,
        justifyContent: "center",
        alignItems: "center"
    },
});