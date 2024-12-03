import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import Svg, { Line } from "react-native-svg";
import TRADES from "../../data/trades.json";
import LineGraph from "../../components/LineGraph";
import { LineData } from "../../types/LineData";
import LineGraphInfo from "../../components/LineGraphInfo";
import PieChart from "react-native-pie-chart";
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatTrades } from "../../utils/Stats";
import StatsContainer from "../../components/StatsContainer";
import { Stats } from "../../types/Stats";

export default function Home() {
  const [lineData, setLineData] = useState<LineData[]>([{ x: 0, y: 0 }]);
  const [highAndLow, setHighAndLow] = useState({ high: 0, low: 0 });
  const [winsAndLosses, setWinsAndLosses] = useState({ win: 0, lose: 0 });
  const [sessionStats, setSessionStats] = useState<Stats>();
  const [pairStats, setPairStats] = useState<Stats>();
  const trades = TRADES.transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  useEffect(() => {
    function getStats() {
      const formattedData = formatTrades(trades)
      setLineData(formattedData.data)
      setHighAndLow(formattedData.highAndLow)
      setWinsAndLosses(formattedData.winsAndLosses)
      setSessionStats(formattedData.sessionStats)
      setPairStats(formattedData.pairStats)
    }

    getStats();
  }, []);

  console.log(sessionStats)
  return (
    <ScrollView style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Recent</Text>
        <View style={styles.recentsGraph}>
          <LineGraph
            lineData={lineData}
            lineColor={"#009acb"}
            parentContainersTotalPaddingAndMargin={60}
            widthPercentage={65}
          />
          <View style={styles.graphInfo}>
            <LineGraphInfo title={"Current"} value={lineData[lineData.length - 1]["y"].toString()} color={"#b377ba"} />
            <LineGraphInfo title={"High"} value={highAndLow.high.toString()} color={"#00c182"} />
            <LineGraphInfo title={"Low"} value={highAndLow.low.toString()} color={"#F72585"} />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Win Rate</Text>
        <View style={styles.pieGraph}>
          {winsAndLosses.win + winsAndLosses.lose > 0 ? (
            <PieChart
              widthAndHeight={200}
              series={[winsAndLosses.win, winsAndLosses.lose]}
              sliceColor={['#156283', '#009acb']}
              coverRadius={0.5}
            />
          ) : (
            <Text style={{ color: '#cac4cd', textAlign: 'center' }}>No data available</Text>
          )}
          <View style={styles.pieGraphInfoContainer}>
            <View style={styles.pieGraphInfo}>
              <Text style={[styles.pieGraphInfoTextHeader, { color: "#156283" }]}>
                {winsAndLosses.win}
              </Text>
              <Text style={[styles.pieGraphInfoText, { color: "#156283" }]}>Wins</Text>
            </View>
            <View style={styles.pieGraphInfo}>
              <Text style={[styles.pieGraphInfoTextHeader, { color: "white" }]}>
                {winsAndLosses.win + winsAndLosses.lose > 0 ? `${((winsAndLosses.win / (winsAndLosses.win + winsAndLosses.lose)) * 100).toFixed(0)}%` : "0%"}
              </Text>
              <Text style={[styles.pieGraphInfoText, { color: "white" }]}>Win Rate</Text>
            </View>
            <View style={styles.pieGraphInfo}>
              <Text style={[styles.pieGraphInfoTextHeader, { color: "#009acb" }]}>
                {winsAndLosses.lose}
              </Text>
              <Text style={[styles.pieGraphInfoText, { color: "#009acb" }]}>Losses</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#120f14",
    padding: 15,
  },
  recentsGraph: {
    height: 200,
    flexDirection: "row",
    marginTop: 15
  },
  stats: {
    // height: 200,
    // flexDirection: "row",
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
    borderColor: "#563658",
    backgroundColor: "#56365850",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "80%",
    maxWidth: 300,
    justifyContent: "space-between",
    gap: 10

  },
  pieGraphInfo: {
    // flexDirection: "row",
    // justifyContent: "center",
    // gap: 10
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
    backgroundColor: "#2c2734",
    padding: 15,
    borderRadius: 10,
  },
  header: {
    color: "#cac4cd",
    fontSize: 17,
    paddingBottom: 10,
    textAlign: "center",
    borderBottomColor: "#cac4cd15",
    borderBottomWidth: 1,
  },
});
