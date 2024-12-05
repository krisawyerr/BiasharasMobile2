import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import TRADES from "../../data/trades.json";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation, useRouter } from "expo-router";
import { Trade } from "../../types/Trade";
import { formatDollarAmount } from "../../utils/format";
import { dark, light } from "../../data/colors";
import { useTheme } from "../../context/ThemeContext";
import Stat from "../../components/Stat";

export default function Trades() {
  const router = useRouter();
  const { theme } = useTheme();
  const colorTheme = theme === "light" ? light : dark
  const [groupedTrades, setGroupedTrades] = useState<Record<string, Trade[]>>({});

  useEffect(() => {
    function groupTrades() {
      const tempHash: Record<string, Trade[]> = {};

      TRADES.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).forEach((item: Trade) => {
        const formatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
        const month = formatter.format(new Date(item.date));

        if (tempHash[month]) {
          tempHash[month].push(item);
        } else {
          tempHash[month] = [item];
        }
      });

      setGroupedTrades(tempHash);
    }

    groupTrades();
  }, []);

  return (
    <ScrollView style={[styles.page, { backgroundColor: colorTheme.bodyBackground, }]}>
      {Object.entries(groupedTrades).map(([month, trades]) => (
        <View key={month} style={[styles.section, { backgroundColor: colorTheme.sectionBackground, }]}>
          <Text style={[styles.header, { color: colorTheme.headerText, }]}>{month}</Text>
          <View style={[styles.tradeItem, { backgroundColor: colorTheme.sectionBackground, borderTopColor: `${colorTheme.headerText}00`, }]}>
            <View style={styles.dateGridCell}>
              <Text style={[styles.date, { color: colorTheme.headerText, }]}>Date</Text>
            </View>
            <View style={styles.gridCell}>
              <Text style={[styles.date, { color: colorTheme.headerText, }]}>Type</Text>
            </View>
            <View style={styles.pnlGridCell}>
              <Text style={[styles.date, { color: colorTheme.headerText, }]}>Profit</Text>
            </View>
          </View>
          {trades.map(trade => (
            <Pressable onPress={() => router.push(`/singleTrade/${trade.transactionId}`)} key={trade.transactionId} style={[styles.tradeItem, { backgroundColor: colorTheme.sectionBackground, borderTopColor: `${colorTheme.headerText}15`, }]}>
              <View style={styles.dateGridCell}>
                <Text style={[styles.date, { color: colorTheme.headerText, }]}>{new Date(trade.date).getUTCDate()}</Text>
                <Text style={[styles.day, { color: colorTheme.headerText, }]}>{new Date(trade.date).toLocaleString('en-US', { weekday: 'short' })}</Text>
              </View>
              <View style={styles.gridCell}>
                <Text style={[styles.type, { color: `${colorTheme.headerText}75`, }]}>{trade.type.toUpperCase()}</Text>
                <Text style={[styles.date, { color: colorTheme.headerText, }]}>{trade.currencyPair}</Text>
              </View>
              <View style={styles.pnlGridCell}>
                {/* <View style={[styles.pnlContainer, { backgroundColor: colorTheme.tradesPnlBackground, }]}>
                  <Ionicons name={trade.profit! < 0 ? "arrow-down" : "arrow-up"} size={18} color={trade.profit! < 0 ? colorTheme.red : colorTheme.green} />
                  <Text style={{ color: trade.profit! < 0 ? colorTheme.red : colorTheme.green }}>{formatDollarAmount(trade.profit)}</Text>
                </View> */}
                <Stat 
                  value={formatDollarAmount(trade.profit)} 
                  color={trade.profit! < 0 ? colorTheme.red : colorTheme.green}                
                />
              </View>
            </Pressable>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 15,
  },
  section: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10
  },
  tradeItem: {
    padding: 10,
    marginVertical: 0,
    borderTopWidth: 1,
    flexDirection: "row",
    flexWrap: 'wrap',
  },
  dateGridCell: {
    width: '15%',
    justifyContent: "center"
  },
  pnlGridCell: {
    width: '40%',
  },
  gridCell: {
    width: "45%",
    justifyContent: "center"
  },
  header: {
    fontSize: 17,
    paddingBottom: 10,
    textAlign: "center"
  },
  date: {
    fontSize: 17,
    textAlign: "center"
  },
  type: {
    textAlign: "center"
  },
  day: {
    textAlign: "center"
  },
  pnlContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    gap: 3
  }
});


