import { StyleSheet, Text, View } from "react-native";

interface LineGraphInfoProps {
    title: string
    value: string
    subValue: string
    color: string
}

export default function Stat({title, value, subValue, color}: LineGraphInfoProps) {
    return (
        <View style={{flex: 1}}>
            <View style={[styles.singleGraphInfo, {backgroundColor: `${color}95`, borderColor: color}]}>
                <Text style={styles.header}>{value}</Text>
                <Text style={styles.text}>{subValue}</Text>
            </View>
            <Text style={styles.header}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    singleGraphInfo: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        marginBottom: 5
    },
    header: {
        color: "white",
        textAlign: "center",
    },
    text: {
        color: "#ffffff75",
        textAlign: "center",
    },
});
