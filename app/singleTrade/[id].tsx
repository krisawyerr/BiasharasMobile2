import { useNavigation, useRoute } from "@react-navigation/native";
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import TRADES from "../../data/trades.json";
import { useEffect, useState } from "react";
import Feather from '@expo/vector-icons/Feather';
import { Link } from "expo-router";
import { dark, light } from "../../data/colors";
import { useTheme } from "../../context/ThemeContext";
import NoData from "../../components/NoData";
import { Trade } from "../../types/Trade";
import { subscribeToTrades } from "../../utils/firebase/trades";

export default function SingleTrade() {
    const { theme } = useTheme();
    const colorTheme = theme === "light" ? light : dark
    const route = useRoute<any>();
    const { id } = route.params;
    const [items, setItems] = useState<Trade[]>([]);
    const trades = items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];
    const trade = trades.find(item => item.transactionId.toString() === id);
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Link href={`/editTrade/${id}`} asChild>
                    <Pressable>
                        <Feather name="edit" size={20} color={colorTheme.headerText} />
                    </Pressable>
                </Link>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = subscribeToTrades(setItems);
        return () => unsubscribe();
    }, []);

    if (!trade) return (
        <NoData
            header="Trade Not Found"
            text="It seems the trade you’re looking for doesn’t exist."
        />
    )

    return (
        <ScrollView style={[styles.page, { backgroundColor: colorTheme.bodyBackground, }]}>
            <View style={[styles.container, { backgroundColor: colorTheme.sectionBackground, }]}>
                <View style={[styles.row, { borderBottomColor: `${colorTheme.bodyBackground}60`, }]}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Date</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{new Date(trade!.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                </View>
                <View style={[styles.row, { borderBottomColor: `${colorTheme.bodyBackground}60`, }]}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Strategy</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{trade!.strategyUsed}</Text>
                </View>
                <View style={[styles.row, { borderBottomColor: `${colorTheme.bodyBackground}60`, }]}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Pair</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{trade!.currencyPair}</Text>
                </View>
                <View style={[styles.row, { borderBottomColor: `${colorTheme.bodyBackground}60`, }]}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Type</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{trade!.type.toUpperCase()}</Text>
                </View>
                <View style={[styles.row, { borderBottomColor: `${colorTheme.bodyBackground}60`, }]}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Session</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{trade?.tradingSession} Session</Text>
                </View>
                <View style={[styles.row, { borderBottomColor: `${colorTheme.bodyBackground}60`, }]}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Risk</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{trade?.amountRisked}</Text>
                </View>
                <View style={[styles.row, { borderBottomColor: `${colorTheme.bodyBackground}60`, }]}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Lots</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{trade?.lots}</Text>
                </View>
                <View style={[styles.row, { borderBottomColor: `${colorTheme.bodyBackground}60`, }]}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Profit</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{trade?.profit}</Text>
                </View>
                <View style={styles.lastRow}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Notes</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{trade?.notes}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    container: {
        margin: 20,
        marginBottom: 40,
        borderRadius: 10,
        overflow: "hidden"
    },
    row: {
        padding: 20,
        borderBottomWidth: 1,
        flexDirection: "row"
    },
    lastRow: {
        padding: 20,
        flexDirection: "row"
    },
    headerText: {
        width: "30%",
        fontWeight: 700,
        fontSize: 17
    },
    infoText: {
        width: "70%",
        fontWeight: 400,
        fontSize: 17
    }
});
