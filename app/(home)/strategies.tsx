
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import TRADES from "../../data/trades.json";
import { useEffect, useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { dark, light } from "../../data/colors";
import { useTheme } from "../../context/ThemeContext";
import STRATEGIES from "../../data/strategies.json"
import { formatTrades } from "../../utils/stats";
import { StrategyData } from "../../types/StrategyData";
import { Ionicons } from "@expo/vector-icons";

export default function Strategies() {
  const router = useRouter();
  const { theme } = useTheme();
  const colorTheme = theme === "light" ? light : dark
  const trades = TRADES.transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const strategies = STRATEGIES.strategies
  const [strategyStats, setStrategyStats] = useState<StrategyData[]>([]);
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('addStrategy')}>
          <Ionicons name="add-circle" size={25} color={colorTheme.headerText} style={{ marginRight: 10 }} />
        </Pressable>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    function getStats() {
      const formattedData = formatTrades(trades)
      setStrategyStats(formattedData.formattedStrategiesData)
    }

    getStats();
  }, []);

  return (
    <ScrollView style={[styles.page, { backgroundColor: colorTheme.bodyBackground, }]}>
      <View style={[styles.section, { backgroundColor: colorTheme.sectionBackground, }]}>
        <View style={[styles.tradeItem, { backgroundColor: colorTheme.sectionBackground, borderTopColor: `${colorTheme.headerText}00`, }]}>
          <View style={styles.titleGridCell}>
            <Text style={[styles.date, { color: colorTheme.headerText, }]}>Name</Text>
          </View>
          <View style={styles.pnlGridCell}>
            <Text style={[styles.date, { color: colorTheme.headerText, }]}>Trades</Text>
          </View>
          <View style={styles.pnlGridCell}>
            <Text style={[styles.date, { color: colorTheme.headerText, }]}>Win Rate</Text>
          </View>
        </View>
        {strategies.map(strategy => {
          const stats = Object.entries(strategyStats).find(([index, values]) => values["pair"] === strategy.name)?.[1]

          return (
            <Pressable onPress={() => router.push(`/singleStrategy/${strategy.id}`)} key={strategy.id} style={[styles.tradeItem, { backgroundColor: colorTheme.sectionBackground, borderTopColor: `${colorTheme.headerText}15`, }]}>
              <View style={styles.titleGridCell}>
                <Text style={[styles.date, { color: colorTheme.headerText, }]}>{strategy.name}</Text>
                <Text style={[styles.type, { color: `${colorTheme.headerText}75`, }]}>{strategy.style}</Text>
              </View>
              <View style={styles.pnlGridCell}>
                <View style={[styles.pnlContainer, { backgroundColor: colorTheme.tradesPnlBackground, }]}>
                  <Text style={{ color: colorTheme.statContainer1 }}>{stats?.totalTrade}</Text>
                </View>
              </View>
              <View style={styles.pnlGridCell}>
                <View style={[styles.pnlContainer, { backgroundColor: colorTheme.tradesPnlBackground, }]}>
                  <Text style={{ color: colorTheme.statContainer1 }}>{stats?.winRate.toFixed(0)}%</Text>
                </View>
              </View>
            </Pressable>
          )
        })}
      </View>
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
  titleGridCell: {
    width: '60%',
  },
  pnlGridCell: {
    width: '19%',
    marginHorizontal: '0.5%'
  },
  gridCell: {
    width: "40%",
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
  },
  postButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


