export interface Trade {
    currencyPair: string,
    amountRisked: number,
    date: string,
    profit: number,
    transactionId: number,
    type: string,
    lots: number,
    tradingSession: string,
    notes?: string
}