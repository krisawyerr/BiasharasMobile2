import { getFirestore, writeBatch, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyCyC4uuCLJP4ValGtejVXVm6-BApzMursc",
    authDomain: "biasharas-28854.firebaseapp.com",
    projectId: "biasharas-28854",
    storageBucket: "biasharas-28854.firebasestorage.app",
    messagingSenderId: "370075153998",
    appId: "1:370075153998:web:47bd7e39064eb572f1751f",
    measurementId: "G-CN9L32CGHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// async function massAddStrategies() {
//   const strategies = [
//     {
//       "strategyId": 1,
//       "name": "Breakout Strategy",
//       "style": "Day Trade",
//       "currency_pair": "EUR/USD",
//       "timeframe": "15M",
//       "detail": "This strategy identifies key support and resistance levels, then places buy stops above resistance and sell stops below support to catch breakouts."
//     },
//     {
//       "strategyId": 2,
//       "name": "Fibonacci Retracement",
//       "style": "Swing Trade",
//       "currency_pair": "GBP/USD",
//       "timeframe": "4H",
//       "detail": "This strategy uses Fibonacci levels to identify potential retracement zones during a trending market and places trades at key levels like 38.2%, 50%, or 61.8%."
//     },
//     {
//       "strategyId": 3,
//       "name": "Scalping with Moving Averages",
//       "style": "Scalping",
//       "currency_pair": "USD/JPY",
//       "timeframe": "1M",
//       "detail": "This scalping strategy uses the crossover of 5 EMA and 20 EMA to identify short-term trading opportunities in high volatility periods."
//     },
//     {
//       "strategyId": 4,
//       "name": "Price Action Reversal",
//       "style": "Day Trade",
//       "currency_pair": "AUD/USD",
//       "timeframe": "1H",
//       "detail": "This strategy looks for reversal candlestick patterns, such as pin bars or engulfing bars, near key support or resistance levels."
//     },
//     {
//       "strategyId": 5,
//       "name": "Trend Following with RSI",
//       "style": "Swing Trade",
//       "currency_pair": "USD/CAD",
//       "timeframe": "1D",
//       "detail": "This strategy follows the trend using a 50-period moving average while using RSI to confirm overbought or oversold conditions for entries."
//     },
//     {
//       "strategyId": 6,
//       "name": "Pivot Point Scalping",
//       "style": "Scalping",
//       "currency_pair": "EUR/JPY",
//       "timeframe": "5M",
//       "detail": "This strategy uses daily pivot points as key levels for quick scalping opportunities, with trades placed near the pivot, resistance, or support levels."
//     },
//     {
//       "strategyId": 7,
//       "name": "News Trading Strategy",
//       "style": "Day Trade",
//       "currency_pair": "NZD/USD",
//       "timeframe": "30M",
//       "detail": "This strategy focuses on high-impact economic news releases, such as GDP or interest rate decisions, to trade based on market reactions."
//     },
//     {
//       "strategyId": 8,
//       "name": "Mean Reversion Strategy",
//       "style": "Swing Trade",
//       "currency_pair": "EUR/CHF",
//       "timeframe": "1H",
//       "detail": "This strategy identifies overextended price movements away from the mean, using Bollinger Bands to time reversion entries."
//     },
//     {
//       "strategyId": 9,
//       "name": "Supply and Demand Zones",
//       "style": "Day Trade",
//       "currency_pair": "USD/CHF",
//       "timeframe": "1H",
//       "detail": "This strategy marks key supply and demand zones and waits for price to return to these areas, entering on confirmation of a reversal."
//     },
//     {
//       "strategyId": 10,
//       "name": "Momentum Breakout",
//       "style": "Scalping",
//       "currency_pair": "GBP/JPY",
//       "timeframe": "1M",
//       "detail": "This strategy uses a momentum indicator, such as MACD or Stochastic, to confirm high-volume breakouts in fast-moving markets."
//     }
//   ];

//   const batch = writeBatch(db);

//   strategies.forEach((strategy) => {
//     const docRef = doc(db, "strategies", `${strategy.strategyId}`);
//     batch.set(docRef, strategy);
//   });

//   await batch.commit();
//   console.log("All strategies have been added!");
// }

// massAddStrategies();
