import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Stat from "./Stat";
import { FormattedStatData } from "../types/FormattedStatData";
import { formatDollarAmount } from "../utils/format";
import { dark } from "../data/colors";

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
  return (
    <View style={styles.section}>
      <Text style={styles.header}>{sectionName} Stats</Text>
      <View style={styles.stats}>
        <View style={styles.statsRow}>
          <Stat title={"Most Traded"} value={mostTraded.pair} subValue={`${mostTraded.totalTrade} Trades`} color={dark.statContainer1} />
          <Stat title={"Least Traded"} value={leastTraded.pair} subValue={`${leastTraded.totalTrade} Trades`} color={dark.statContainer1} />
        </View>
        <View style={styles.statsRow}>
          <Stat title={"Best PnL"} value={bestPnL.pair} subValue={formatDollarAmount(bestPnL.pnl)} color={dark.statContainer2} />
          <Stat title={"Worst PnL"} value={worstPnL.pair} subValue={formatDollarAmount(worstPnL.pnl)} color={dark.statContainer3} />
        </View>
        <View style={styles.statsRow}>
          <Stat title={"Best Win Rate"} value={bestWinRate.pair} subValue={`${bestWinRate.winRate.toFixed(0)}%`} color={dark.statContainer2} />
          <Stat title={"Worst Win Rate"} value={worstWinRate.pair} subValue={`${worstWinRate.winRate.toFixed(0)}%`} color={dark.statContainer3} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: dark.bodyBackground,
    padding: 15,
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
    justifyContent: "space-between",
    gap: 15
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
    borderColor: dark.statContainer4,
    backgroundColor: `${dark.statContainer4}50`,
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
    backgroundColor: dark.sectionBackground,
    padding: 15,
    borderRadius: 10,
  },
  header: {
    color: dark.headerText,
    fontSize: 17,
    paddingBottom: 10,
    textAlign: "center",
    borderBottomColor: `${dark.headerText}15`,
    borderBottomWidth: 1,
  },
});
