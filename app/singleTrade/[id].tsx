import { useNavigation, useRoute } from "@react-navigation/native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import TRADES from "../../data/trades.json";
import { useEffect } from "react";
import Feather from '@expo/vector-icons/Feather';
import { Link } from "expo-router";
import { dark } from "../../data/colors";

export default function SingleTrade() {
    const route = useRoute<any>();
    const { id } = route.params;
    const trade = TRADES.transactions.find(item => item.transactionId.toString() === id);
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Link href={`/editTrade/${id}`} asChild>
                    <Pressable>
                        <Feather name="edit" size={20} color={dark.headerText} />
                    </Pressable>
                </Link>
            ),
        });
    }, [navigation]);

    return (
        <ScrollView style={styles.page}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.headerText}>Date</Text>
                    <Text style={styles.infoText}>{new Date(trade!.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.headerText}>Pair</Text>
                    <Text style={styles.infoText}>{trade!.currencyPair}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.headerText}>Type</Text>
                    <Text style={styles.infoText}>{trade!.type.toUpperCase()}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.headerText}>Session</Text>
                    <Text style={styles.infoText}>{trade?.tradingSession} Session</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.headerText}>Risk</Text>
                    <Text style={styles.infoText}>{trade?.amountRisked}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.headerText}>Lots</Text>
                    <Text style={styles.infoText}>{trade?.lots}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.headerText}>Profit</Text>
                    <Text style={styles.infoText}>{trade?.profit}</Text>
                </View>
                <View style={styles.lastRow}>
                    <Text style={styles.headerText}>Notes</Text>
                    <Text style={styles.infoText}>{trade?.notes}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: dark.bodyBackground,
    },
    container: {
        backgroundColor: dark.sectionBackground,
        margin: 20,
        marginBottom: 40,
        borderRadius: 10,
        overflow: "hidden"
    },
    row: {
        padding: 20,
        borderBottomColor: `${dark.bodyBackground}60`,
        borderBottomWidth: 1,
        flexDirection: "row"
    },
    lastRow: {
        padding: 20,
        flexDirection: "row"
    },
    headerText: {
        width: "30%",
        color: dark.headerText,
        fontWeight: 700,
        fontSize: 17
    },
    infoText: {
        width: "70%",
        color: dark.headerText,
        fontWeight: 400,
        fontSize: 17
    }
});
