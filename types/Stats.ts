import { FormattedStatData } from "./FormattedStatData"

export interface Stats {
    mostTraded: FormattedStatData
    leastTraded: FormattedStatData
    bestPnL: FormattedStatData
    worstPnL: FormattedStatData
    bestWinRate: FormattedStatData
    worstWinRate: FormattedStatData
}