
import { useRoute } from "@react-navigation/native";
import TRADES from '../../data/trades.json';
import React from 'react'
import TradeForm from "../../components/TradeForm";

export default function EditTrade() {
  const route = useRoute<any>()
  const { id } = route.params
  const trade = TRADES.transactions.find(item => item.transactionId.toString() === id)

  return (
    <TradeForm
      formType={"edit"}
      trade={trade}
    />
  )
}