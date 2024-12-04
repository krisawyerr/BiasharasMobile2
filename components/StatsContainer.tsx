import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import Stat from "./Stat";
import { FormattedStatData } from "../types/FormattedStatData";
import { formatDollarAmount } from "../utils/format";
import { dark, light } from "../data/colors";
import { useTheme } from "../context/ThemeContext";

interface StatsContainerProps {
  sectionName: string
  mostTraded: FormattedStatData
  leastTraded: FormattedStatData
  bestPnL: FormattedStatData
  worstPnL: FormattedStatData
  bestWinRate: FormattedStatData
  worstWinRate: FormattedStatData
}

export default function StatsContainer({ sectionName, mostTraded, leastTraded, bestPnL, worstPnL, bestWinRate, worstWinRate }: StatsContainerProps) {
  const { theme } = useTheme();
  const colorTheme = theme === "light" ? light : dark

  return (
    <View style={[styles.section, {backgroundColor: colorTheme.sectionBackground,}]}>
      <Text style={[styles.header, {color: colorTheme.headerText,borderBottomColor: `${colorTheme.headerText}15`,}]}>{sectionName} Stats</Text>
      <View style={styles.stats}>
        <View style={styles.statsRow}>
          <Stat title={"Most Traded"} value={mostTraded.pair} subValue={`${mostTraded.totalTrade} Trades`} color={colorTheme.statContainer1} />
          <Stat title={"Least Traded"} value={leastTraded.pair} subValue={`${leastTraded.totalTrade} Trades`} color={colorTheme.statContainer1} />
        </View>
        <View style={styles.statsRow}>
          <Stat title={"Best PnL"} value={bestPnL.pair} subValue={formatDollarAmount(bestPnL.pnl)} color={colorTheme.statContainer2} />
          <Stat title={"Worst PnL"} value={worstPnL.pair} subValue={formatDollarAmount(worstPnL.pnl)} color={colorTheme.statContainer3} />
        </View>
        <View style={styles.statsRow}>
          <Stat title={"Best Win Rate"} value={bestWinRate.pair} subValue={`${bestWinRate.winRate.toFixed(0)}%`} color={colorTheme.statContainer2} />
          <Stat title={"Worst Win Rate"} value={worstWinRate.pair} subValue={`${worstWinRate.winRate.toFixed(0)}%`} color={colorTheme.statContainer3} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: "space-between",
    gap: 15
  },
  pieGraph: {
    alignItems: "center",
    gap: 20,
    paddingVertical: 20
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
  },
  header: {
    fontSize: 17,
    paddingBottom: 10,
    textAlign: "center",
    borderBottomWidth: 1,
  },
});
