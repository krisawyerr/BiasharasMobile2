
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from 'react'
import TradeForm from "../../components/TradeForm";
import { Trade } from "../../types/Trade";
import { subscribeToTrades } from "../../utils/firebase/trades";
import NoData from "../../components/NoData";
import { useAuth } from "../../context/UserContext";

export default function EditTrade() {
  const route = useRoute<any>()
  const { id } = route.params
  const [items, setItems] = useState<Trade[]>([]);
  const trades = items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];
  const trade = trades.find(item => item.transactionId.toString() === id);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = subscribeToTrades(user.uid, setItems);
    return () => unsubscribe();
  }, []);

  if (!trade) return (
    <NoData
      header="Trade Not Found"
      text="It seems the trade you’re looking for doesn’t exist."
    />
  )

  return (
    <TradeForm
      formType={"edit"}
      trade={trade}
    />
  )
}