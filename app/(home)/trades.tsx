import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import TRADES from "../../data/trades.json";
import { useEffect, useState } from "react";

interface Trade {
  transactionId: number;
  type: string;
  date: string;
  amount: number;
  status: string;
  currency?: string;
  currencyPair?: string;
  exchangeRate?: number;
  resultRate?: number;
  profit?: number;
}

export default function Trades() {
  const [groupedTrades, setGroupedTrades] = useState<Record<string, Trade[]>>({});

  useEffect(() => {
    function groupTrades() {
      const tempHash: Record<string, Trade[]> = {};

      TRADES.transactions.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).forEach((item: Trade) => {
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
          <Text style={styles.text}>{month}</Text>
          <FlatList
            data={trades}
            keyExtractor={(item) => item.transactionId.toString()}
            renderItem={({ item }) => (
              <View style={styles.tradeItem}>
                <Text style={styles.text}>{item.type}</Text>
                <Text style={styles.text}>{item.date}</Text>
              </View>
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#120f14",
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  tradeItem: {
    padding: 10,
    backgroundColor: "#1c1b21",
    marginVertical: 5,
    borderRadius: 5,
  },
  text: {
    color: "white",
  },
});
