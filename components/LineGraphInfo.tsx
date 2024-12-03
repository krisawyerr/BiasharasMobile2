import { StyleSheet, Text, View } from "react-native";
import { dark } from "../data/colors";

interface LineGraphInfoProps {
    title: string
    value: string
    color: string
}

export default function LineGraphInfo({ title, value, color }: LineGraphInfoProps) {
    return (
        <View style={[styles.singleGraphInfo, { backgroundColor: `${color}25`, borderColor: color }]}>
            <Text style={[styles.text, { color: color }]}>{title}</Text>
            <Text style={[styles.text, { color: `${color}95` }]}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    singleGraphInfo: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 3,
        height: "30%",
        justifyContent: "center"
    },
    text: {
        textAlign: "center",
    },
});
