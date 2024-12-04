
import { useRoute } from "@react-navigation/native";
import TRADES from '../../data/trades.json';
import STRATEGIES from '../../data/strategies.json';
import React from 'react'
import StrategyForm from "../../components/StrategyForm";

export default function EditTrade() {
  const route = useRoute<any>()
  const { id } = route.params
  const trade = TRADES.transactions.find(item => item.transactionId.toString() === id)
  const strategy = STRATEGIES.strategies.find(item => item.id.toString() === id)

  return (
    <StrategyForm
      formType={"edit"}
      strategy={strategy}
    />
  )
}