export interface Trade {
    id: string,
    currencyPair: string,
    amountRisked: number,
    date: string,
    profit: number | string,
    transactionId: number,
    type: string,
    lots: number,
    tradingSession: string,
    notes?: string,
    strategyUsed: string
}