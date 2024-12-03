import { StyleSheet, Text, View } from "react-native";
import { dark } from "../data/colors";

interface LineGraphInfoProps {
    title: string
    value: string
    subValue: string
    color: string
}

export default function Stat({title, value, subValue, color}: LineGraphInfoProps) {
    return (
        <View style={{flex: 1}}>
            <View style={[styles.singleGraphInfo, {backgroundColor: `${color}25`, borderColor: color}]}>
                <Text style={[styles.text, {color: color}]}>{value}</Text>
                <Text style={[styles.text, {color: `${color}95`}]}>{subValue}</Text>
            </View>
            <Text style={[styles.text, {color: dark.headerText}]}>{title}</Text>
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
    text: {
        textAlign: "center",
    },
});
