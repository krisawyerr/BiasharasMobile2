import { FormattedStatData } from "../types/FormattedStatData";
import { LineData } from "../types/LineData";
import { Stats } from "../types/Stats";
import { StrategyData } from "../types/StrategyData";
import { Trade } from "../types/Trade";

interface StatData {
    wins: number
    losses: number
    pnl: number
}

export function formatTrades(trade: Trade[]) {
    let data: LineData[] = [];
    let position = { index: 0, total: 0 };
    let highAndLow = { high: 0, low: 0 };
    let winsAndLosses = { win: 0, lose: 0 };
    let sessionsData: Record<string, StatData> = {};
    let pairsData: Record<string, StatData> = {};
    let strategiesData: Record<string, StatData> = {};

    trade.forEach((item) => {
        const pnl = parseFloat(item.profit.toString())
        if (position.index === 0) {
            highAndLow.high = pnl;
            highAndLow.low = pnl;
        }

        position.total += pnl;
        position.index++;
        data.push({ x: position.index, y: position.total });

        highAndLow.high = Math.max(highAndLow.high, position.total);
        highAndLow.low = Math.min(highAndLow.low, position.total);

        if (pnl >= 0) {
            winsAndLosses.win++;
        } else {
            winsAndLosses.lose++;
        }

        const session = sessionsData[item.tradingSession] || { wins: 0, losses: 0, pnl: 0 };
        session.pnl += pnl;
        if (pnl >= 0) session.wins++;
        else session.losses++;

        sessionsData[item.tradingSession] = session;

        const pair = pairsData[item.currencyPair] || { wins: 0, losses: 0, pnl: 0 };
        pair.pnl += pnl;
        if (pnl >= 0) pair.wins++;
        else pair.losses++;

        pairsData[item.currencyPair] = pair;

        if (item.strategyUsed !== "none") {
            const strategy = strategiesData[item.strategyUsed] || { wins: 0, losses: 0, pnl: 0 };
            strategy.pnl += pnl;
            if (pnl >= 0) strategy.wins++;
            else strategy.losses++;

            strategiesData[item.strategyUsed] = strategy;
        }
    });

    const formatData = (data: Record<string, StatData>) => {
        return Object.entries(data).map(([key, stats]) => {
            const totalTrade = stats.wins + stats.losses;
            const winRate = (stats.wins / totalTrade) * 100;
            return { pair: key, totalTrade, winRate, pnl: stats.pnl };
        });
    };

    const formattedPairsData: StrategyData[] = formatData(pairsData);
    const formattedSessionsData: StrategyData[] = formatData(sessionsData);
    const formattedStrategiesData: StrategyData[] = formatData(strategiesData);

    const getStats = (formattedData: FormattedStatData[]) => {
        return {
            mostTraded: formattedData.reduce((max, current) => current.totalTrade > max.totalTrade ? current : max),
            leastTraded: formattedData.reduce((min, current) => current.totalTrade < min.totalTrade ? current : min),
            bestPnL: formattedData.reduce((max, current) => current.pnl > max.pnl ? current : max),
            worstPnL: formattedData.reduce((min, current) => current.pnl < min.pnl ? current : min),
            bestWinRate: formattedData.reduce((max, current) => current.winRate > max.winRate ? current : max),
            worstWinRate: formattedData.reduce((min, current) => current.winRate < min.winRate ? current : min),
        };
    };

    const pairStats: Stats = getStats(formattedPairsData);
    const sessionStats: Stats = getStats(formattedSessionsData);
    const strategiesStats: Stats = getStats(formattedStrategiesData);

    return { data, highAndLow, winsAndLosses, sessionStats, pairStats, strategiesStats, formattedStrategiesData };
}
