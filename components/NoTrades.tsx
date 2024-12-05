import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { dark, light } from "../data/colors";
import { useTheme } from "../context/ThemeContext";


export default function NoTrades() {
    const { theme } = useTheme();
    const colorTheme = theme === "light" ? light : dark

    return (
        <View style={[styles.page, { backgroundColor: colorTheme.bodyBackground }]}>
            <View style={[styles.section, { backgroundColor: colorTheme.sectionBackground, }]}>
                <Text style={[styles.header, { color: colorTheme.headerText, borderBottomColor: `${colorTheme.headerText}15`, }]}>No Trades Available</Text>
                <View style={styles.pieGraph}>
                    <Text style={{ color: colorTheme.headerText, textAlign: 'center' }}>To see your stats, please add some trades. Once your information is submitted, the stats will be displayed here.</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    recentsGraph: {
        height: 200,
        flexDirection: "row",
        marginTop: 15
    },
    stats: {
        marginTop: 15,
        gap: 15
    },
    graphInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: "space-between"
    },
    statsRow: {
        flexDirection: "row",
        flex: 1,
        marginLeft: 15,
        justifyContent: "space-between"
    },
    pieGraph: {
        alignItems: "center",
        gap: 20,
        paddingVertical: 20
    },
    pieGraphInfoContainer: {
        flexDirection: "row",
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: "80%",
        maxWidth: 300,
        justifyContent: "space-between",
        gap: 10

    },
    pieGraphInfoTextHeader: {
        fontWeight: 900,
        fontSize: 24,
        textAlign: "center"
    },
    pieGraphInfoText: {
        fontWeight: 600,
        fontSize: 17,
        textAlign: "center"
    },
    section: {
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        width: 300,
    },
    header: {
        fontSize: 17,
        paddingBottom: 10,
        textAlign: "center",
        borderBottomWidth: 1,
    },
});
