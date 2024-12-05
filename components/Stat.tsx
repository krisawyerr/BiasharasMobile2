import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { dark, light } from "../data/colors";
import { useTheme } from "../context/ThemeContext";

interface LineGraphInfoProps {
    title?: string
    value: string
    subValue?: string
    color: string
}

export default function Stat({title, value, subValue, color}: LineGraphInfoProps) {
    const { theme } = useTheme();
    const colorTheme = theme === "light" ? light : dark

    return (
        <View style={{flex: 1}}>
            <View style={[styles.singleGraphInfo, {backgroundColor: `${color}25`, borderColor: color}]}>
                <Text style={[styles.text, {color: color}]}>{value}</Text>
                {subValue && <Text style={[styles.text, {color: `${color}95`}]}>{subValue}</Text>}
            </View>
            {title && <Text style={[styles.text, {color: colorTheme.headerText}]}>{title}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    singleGraphInfo: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        marginBottom: 5,
        flex: 1,
        justifyContent: "center"
    },
    text: {
        textAlign: "center",
    },
});
