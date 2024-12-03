import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import TRADES from "../../data/trades.json";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Trade } from "../../types/Trade";
import { formatDollarAmount } from "../../utils/format";
import { dark } from "../../data/colors";

export default function Trades() {
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
    <ScrollView style={styles.page}>
      {Object.entries(groupedTrades).map(([month, trades]) => (
        <View key={month} style={styles.section}>
          <Text style={styles.header}>{month}</Text>
          {trades.map(trade => (
            <Link href={`/singleTrade/${trade.transactionId}`} key={trade.transactionId} asChild>
              <Pressable style={styles.tradeItem}>
                <View style={styles.dateGridCell}>
                  <Text style={styles.date}>{new Date(trade.date).getUTCDate()}</Text>
                  <Text style={styles.day}>{new Date(trade.date).toLocaleString('en-US', { weekday: 'short' })}</Text>
                </View>
                <View style={styles.gridCell}>
                  <Text style={styles.type}>{trade.type.toUpperCase()}</Text>
                  <Text style={styles.date}>{trade.currencyPair}</Text>
                </View>
                <View style={styles.pnlGridCell}>
                  <View style={styles.pnlContainer}>
                    <Ionicons name={trade.profit! < 0 ? "arrow-down" : "arrow-up"} size={18} color={trade.profit! < 0 ? dark.red : dark.green} />
                    <Text style={{ color: trade.profit! < 0 ? dark.red : dark.green }}>{formatDollarAmount(trade.profit)}</Text>
                  </View>
                </View>
              </Pressable>
            </Link>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: dark.bodyBackground,
    padding: 15,
  },
  section: {
    marginBottom: 15,
    backgroundColor: dark.sectionBackground,
    padding: 15,
    borderRadius: 10
  },
  tradeItem: {
    padding: 10,
    backgroundColor: dark.sectionBackground,
    marginVertical: 0,
    borderTopColor: `${dark.headerText}15`,
    borderTopWidth: 1,
    flexDirection: "row",
    flexWrap: 'wrap',
  },
  dateGridCell: {
    width: '10%',
  },
  pnlGridCell: {
    width: '50%',
  },
  gridCell: {
    width: "40%",
    justifyContent: "center"
  },
  header: {
    color: dark.headerText,
    fontSize: 17,
    paddingBottom: 10,
    textAlign: "center"
  },
  date: {
    color: dark.headerText,
    fontSize: 17,
    textAlign: "center"
  },
  type: {
    color: `${dark.headerText}75`,
    textAlign: "center"
  },
  day: {
    color: dark.headerText,
    textAlign: "center"
  },
  text: {
    color: dark.headerText,
  },
  pnlContainer: {
    flex: 1,
    backgroundColor: dark.tradesPnlBackground,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    gap: 3
  }
});
