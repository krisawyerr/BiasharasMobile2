import { StyleSheet, Text, View } from "react-native";

interface LineGraphInfoProps {
    title: string
    value: string
    color: string
}

export default function LineGraphInfo({title, value, color}: LineGraphInfoProps) {
    return (
        <View style={[styles.singleGraphInfo, {backgroundColor: `${color}95`, borderColor: color}]}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.text}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    singleGraphInfo: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 3,
        height: "30%",
    },
    text: {
        color: "white",
        textAlign: "center",
    },
});
