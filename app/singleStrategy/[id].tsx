import { useNavigation, useRoute } from "@react-navigation/native";
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import TRADES from "../../data/trades.json";
import { useEffect, useState } from "react";
import Feather from '@expo/vector-icons/Feather';
import { Link } from "expo-router";
import { dark, light } from "../../data/colors";
import { useTheme } from "../../context/ThemeContext";
import STRATEGIES from "../../data/strategies.json"
import { subscribeToStrategies } from "../../utils/firebase/strategies";
import { Strategy } from "../../types/Strategy";
import NoData from "../../components/NoData";


export default function SingleStrategy() {
    const { theme } = useTheme();
    const colorTheme = theme === "light" ? light : dark
    const route = useRoute<any>();
    const { id } = route.params;
    const [strategies, setStrategies] = useState<Strategy[]>([]);
    const strategy = strategies.find(item => item.id.toString() === id)
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Link href={`/editStrategy/${id}`} asChild>
                    <Pressable>
                        <Feather name="edit" size={20} color={colorTheme.headerText} />
                    </Pressable>
                </Link>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribeStrats = subscribeToStrategies(setStrategies);
        return () => unsubscribeStrats();
    }, []);

    if (!strategy) return (
        <NoData
            header="Strategy Not Found"
            text="It seems the strategy you’re looking for doesn’t exist."
        />
    )

    return (
        <ScrollView style={[styles.page, { backgroundColor: colorTheme.bodyBackground, }]}>
            <View style={[styles.container, { backgroundColor: colorTheme.sectionBackground, }]}>
                <View style={[styles.row, { borderBottomColor: `${colorTheme.bodyBackground}60`, }]}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Name</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{strategy?.name}</Text>
                </View>
                <View style={[styles.row, { borderBottomColor: `${colorTheme.bodyBackground}60`, }]}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Style</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{strategy?.style}</Text>
                </View>
                <View style={[styles.row, { borderBottomColor: `${colorTheme.bodyBackground}60`, }]}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Pair</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{strategy?.currency_pair}</Text>
                </View>
                <View style={[styles.row, { borderBottomColor: `${colorTheme.bodyBackground}60`, }]}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Timeframe</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{strategy?.timeframe}</Text>
                </View>
                <View style={[styles.row, { borderBottomColor: `${colorTheme.bodyBackground}60`, }]}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Details</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{strategy?.detail}</Text>
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
