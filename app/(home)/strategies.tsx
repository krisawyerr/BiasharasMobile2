
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { dark, light } from "../../data/colors";
import { useTheme } from "../../context/ThemeContext";
import { formatTrades } from "../../utils/stats";
import { StrategyData } from "../../types/StrategyData";
import { Ionicons } from "@expo/vector-icons";
import Stat from "../../components/Stat";
import { subscribeToStrategies } from "../../utils/firebase/strategies";
import { Strategy } from "../../types/Strategy";
import { subscribeToTrades } from "../../utils/firebase/trades";
import { Trade } from "../../types/Trade";
import NoData from "../../components/NoData";
import Loading from "../../components/Loading";
import { useAuth } from "../../context/UserContext";

export default function Strategies() {
  const router = useRouter();
  const { theme } = useTheme();
  const colorTheme = theme === "light" ? light : dark
  const [strategyStats, setStrategyStats] = useState<StrategyData[]>([]);
  const navigation = useNavigation()
  const [strategies, setStrategies] = useState<Strategy[]>();
  const [allTrades, setAllTrades] = useState<Trade[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeStrats = subscribeToStrategies(user.uid, setStrategies);
    return () => unsubscribeStrats();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToTrades(user.uid, setAllTrades);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('addStrategy')}>
          <Ionicons name="add-circle" size={25} color={colorTheme.headerText} style={{ marginRight: 10 }} />
        </Pressable>
      ),
    });
  }, [navigation, colorTheme]);

  useEffect(() => {
    function getStats() {
      if (allTrades.length > 0) {
        const formattedData = formatTrades(allTrades)
        setStrategyStats(formattedData.formattedStrategiesData)
      }

      setLoading(false);
    }

    getStats();
  }, [allTrades]);

  if (!strategies || loading) return <Loading />;
  if (strategies.length === 0) return (
    <NoData
      header="No Strategies Available"
      text="To see your strategies, please add some strategies. Once your information is submitted, the strategies will be displayed here."
    />
  )

  return (
    <ScrollView style={[styles.page, { backgroundColor: colorTheme.bodyBackground, }]}>
      {strategies && <View style={[styles.section, { backgroundColor: colorTheme.sectionBackground, }]}>
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
                <Stat value={stats?.totalTrade.toString() || "0"} color={colorTheme.statContainer1} />
              </View>
              <View style={styles.pnlGridCell}>
                <Stat value={stats ? `${stats?.winRate.toFixed(0)}%` : "0"} color={colorTheme.statContainer1} />
              </View>
            </Pressable>
          )
        })}
      </View>}
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
    width: '49%',
    justifyContent: "center",
    marginRight: '1%'
  },
  pnlGridCell: {
    width: '24%',
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


