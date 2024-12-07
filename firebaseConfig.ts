import { getFirestore, writeBatch, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export { auth, db }

// async function massAddStrategies() {
//   const strategies = [
//     {
//       "user": "9SVSvC2ENaRdcu966rmbO1qIUAw1",
//       "strategyId": 1,
//       "name": "Breakout Strategy",
//       "style": "Day Trade",
//       "currency_pair": "EUR/USD",
//       "timeframe": "15M",
//       "detail": "This strategy identifies key support and resistance levels, then places buy stops above resistance and sell stops below support to catch breakouts."
//     },
//     {
//       "user": "9SVSvC2ENaRdcu966rmbO1qIUAw1",
//       "strategyId": 2,
//       "name": "Fibonacci Retracement",
//       "style": "Swing Trade",
//       "currency_pair": "GBP/USD",
//       "timeframe": "4H",
//       "detail": "This strategy uses Fibonacci levels to identify potential retracement zones during a trending market and places trades at key levels like 38.2%, 50%, or 61.8%."
//     },
//     {
//       "user": "9SVSvC2ENaRdcu966rmbO1qIUAw1",
//       "strategyId": 3,
//       "name": "Scalping with Moving Averages",
//       "style": "Scalping",
//       "currency_pair": "USD/JPY",
//       "timeframe": "1M",
//       "detail": "This scalping strategy uses the crossover of 5 EMA and 20 EMA to identify short-term trading opportunities in high volatility periods."
//     },
//     {
//       "user": "9SVSvC2ENaRdcu966rmbO1qIUAw1",
//       "strategyId": 4,
//       "name": "Price Action Reversal",
//       "style": "Day Trade",
//       "currency_pair": "AUD/USD",
//       "timeframe": "1H",
//       "detail": "This strategy looks for reversal candlestick patterns, such as pin bars or engulfing bars, near key support or resistance levels."
//     },
//     {
//       "user": "9SVSvC2ENaRdcu966rmbO1qIUAw1",
//       "strategyId": 5,
//       "name": "Trend Following with RSI",
//       "style": "Swing Trade",
//       "currency_pair": "USD/CAD",
//       "timeframe": "1D",
//       "detail": "This strategy follows the trend using a 50-period moving average while using RSI to confirm overbought or oversold conditions for entries."
//     },
//     {
//       "user": "9SVSvC2ENaRdcu966rmbO1qIUAw1",
//       "strategyId": 6,
//       "name": "Pivot Point Scalping",
//       "style": "Scalping",
//       "currency_pair": "EUR/JPY",
//       "timeframe": "5M",
//       "detail": "This strategy uses daily pivot points as key levels for quick scalping opportunities, with trades placed near the pivot, resistance, or support levels."
//     },
//     {
//       "user": "9SVSvC2ENaRdcu966rmbO1qIUAw1",
//       "strategyId": 7,
//       "name": "News Trading Strategy",
//       "style": "Day Trade",
//       "currency_pair": "NZD/USD",
//       "timeframe": "30M",
//       "detail": "This strategy focuses on high-impact economic news releases, such as GDP or interest rate decisions, to trade based on market reactions."
//     },
//     {
//       "user": "9SVSvC2ENaRdcu966rmbO1qIUAw1",
//       "strategyId": 8,
//       "name": "Mean Reversion Strategy",
//       "style": "Swing Trade",
//       "currency_pair": "EUR/CHF",
//       "timeframe": "1H",
//       "detail": "This strategy identifies overextended price movements away from the mean, using Bollinger Bands to time reversion entries."
//     },
//     {
//       "user": "9SVSvC2ENaRdcu966rmbO1qIUAw1",
//       "strategyId": 9,
//       "name": "Supply and Demand Zones",
//       "style": "Day Trade",
//       "currency_pair": "USD/CHF",
//       "timeframe": "1H",
//       "detail": "This strategy marks key supply and demand zones and waits for price to return to these areas, entering on confirmation of a reversal."
//     },
//     {
//       "user": "9SVSvC2ENaRdcu966rmbO1qIUAw1",
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
//     const docRef = doc(db, "strategies", `${strategy.strategyId}0`);
//     batch.set(docRef, strategy);
//   });

//   await batch.commit();
//   console.log("All strategies have been added!");
// }

// massAddStrategies();
