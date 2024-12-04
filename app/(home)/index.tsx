import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import TRADES from "../../data/trades.json";
import LineGraph from "../../components/LineGraph";
import { LineData } from "../../types/LineData";
import LineGraphInfo from "../../components/LineGraphInfo";
import PieChart from "react-native-pie-chart";
import StatsContainer from "../../components/StatsContainer";
import { Stats } from "../../types/Stats";
import { formatDollarAmount } from "../../utils/format";
import { formatTrades } from "../../utils/stats";
import { dark, light } from "../../data/colors";
import { useTheme } from "../../context/ThemeContext";

export default function Home() {
  const [lineData, setLineData] = useState<LineData[]>([{ x: 0, y: 0 }]);
  const [highAndLow, setHighAndLow] = useState({ high: 0, low: 0 });
  const [winsAndLosses, setWinsAndLosses] = useState({ win: 0, lose: 0 });
  const [sessionStats, setSessionStats] = useState<Stats>();
  const [pairStats, setPairStats] = useState<Stats>();
  const [strategyStats, setStrategyStats] = useState<Stats>();
  const trades = TRADES.transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const { theme } = useTheme();
  const colorTheme = theme === "light" ? light : dark

  useEffect(() => {
    function getStats() {
      const formattedData = formatTrades(trades)
      setLineData(formattedData.data)
      setHighAndLow(formattedData.highAndLow)
      setWinsAndLosses(formattedData.winsAndLosses)
      setSessionStats(formattedData.sessionStats)
      setPairStats(formattedData.pairStats)
      setStrategyStats(formattedData.strategiesStats)
    }

    getStats();
  }, []);

  return (
    <ScrollView style={[styles.page, { backgroundColor: colorTheme.bodyBackground }]}>
      <View style={[styles.section, {backgroundColor: colorTheme.sectionBackground,}]}>
        <Text style={[styles.header, {    color: colorTheme.headerText,borderBottomColor: `${colorTheme.headerText}15`,}]}>Recent</Text>
        <View style={styles.recentsGraph}>
          <LineGraph
            lineData={lineData}
            lineColor={colorTheme.lineGraph}
            parentContainersTotalPaddingAndMargin={60}
            widthPercentage={65}
          />
          <View style={styles.graphInfo}>
            <LineGraphInfo title={"Current"} value={formatDollarAmount(lineData[lineData.length - 1]["y"])} color={colorTheme.statContainer1} />
            <LineGraphInfo title={"High"} value={formatDollarAmount(highAndLow.high)} color={colorTheme.statContainer2} />
            <LineGraphInfo title={"Low"} value={formatDollarAmount(highAndLow.low)} color={colorTheme.statContainer3} />
          </View>
        </View>
      </View>
      <View style={[styles.section, {backgroundColor: colorTheme.sectionBackground,}]}>
        <Text style={[styles.header, {    color: colorTheme.headerText,borderBottomColor: `${colorTheme.headerText}15`,}]}>Win Rate</Text>
        <View style={styles.pieGraph}>
          {winsAndLosses.win + winsAndLosses.lose > 0 ? (
            <PieChart
              widthAndHeight={200}
              series={[winsAndLosses.win, winsAndLosses.lose]}
              sliceColor={[colorTheme.pieChart1, colorTheme.pieChart2]}
              coverRadius={0.5}
            />
          ) : (
            <Text style={{ color: colorTheme.headerText, textAlign: 'center' }}>No data available</Text>
          )}
          <View style={[styles.pieGraphInfoContainer, { borderColor: colorTheme.statContainer4, backgroundColor: `${colorTheme.statContainer4}50` }]}>
            <View>
              <Text style={[styles.pieGraphInfoTextHeader, { color: colorTheme.pieChart1 }]}>
                {winsAndLosses.win}
              </Text>
              <Text style={[styles.pieGraphInfoText, { color: colorTheme.pieChart1 }]}>Wins</Text>
            </View>
            <View>
              <Text style={[styles.pieGraphInfoTextHeader, { color: colorTheme.headerText }]}>
                {winsAndLosses.win + winsAndLosses.lose > 0 ? `${((winsAndLosses.win / (winsAndLosses.win + winsAndLosses.lose)) * 100).toFixed(0)}%` : "0%"}
              </Text>
              <Text style={[styles.pieGraphInfoText, { color: colorTheme.headerText }]}>Win Rate</Text>
            </View>
            <View>
              <Text style={[styles.pieGraphInfoTextHeader, { color: colorTheme.pieChart2 }]}>
                {winsAndLosses.lose}
              </Text>
              <Text style={[styles.pieGraphInfoText, { color: colorTheme.pieChart2 }]}>Losses</Text>
            </View>
          </View>
        </View>
      </View>
      {pairStats && <StatsContainer
        sectionName="Pair"
        mostTraded={pairStats?.mostTraded}
        leastTraded={pairStats?.leastTraded}
        bestPnL={pairStats?.bestPnL}
        worstPnL={pairStats?.worstPnL}
        bestWinRate={pairStats?.bestWinRate}
        worstWinRate={pairStats?.worstWinRate}
      />}
      {sessionStats && <StatsContainer
        sectionName="Session"
        mostTraded={sessionStats?.mostTraded}
        leastTraded={sessionStats?.leastTraded}
        bestPnL={sessionStats?.bestPnL}
        worstPnL={sessionStats?.worstPnL}
        bestWinRate={sessionStats?.bestWinRate}
        worstWinRate={sessionStats?.worstWinRate}
      />}
      {strategyStats && <StatsContainer
        sectionName="Strategy"
        mostTraded={strategyStats?.mostTraded}
        leastTraded={strategyStats?.leastTraded}
        bestPnL={strategyStats?.bestPnL}
        worstPnL={strategyStats?.worstPnL}
        bestWinRate={strategyStats?.bestWinRate}
        worstWinRate={strategyStats?.worstWinRate}
      />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
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
  },
  header: {
    fontSize: 17,
    paddingBottom: 10,
    textAlign: "center",
    borderBottomWidth: 1,
  },
});
