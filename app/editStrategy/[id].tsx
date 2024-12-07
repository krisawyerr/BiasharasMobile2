
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from 'react'
import StrategyForm from "../../components/StrategyForm";
import { subscribeToStrategies } from "../../utils/firebase/strategies";
import { Strategy } from "../../types/Strategy";
import NoData from "../../components/NoData";
import { useAuth } from "../../context/UserContext";

export default function EditTrade() {
  const route = useRoute<any>()
  const { id } = route.params
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const strategy = strategies.find(item => item.id === id)
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribeStrats = subscribeToStrategies(user.uid, setStrategies);
    return () => unsubscribeStrats();
  }, []);

  if (!strategy) return (
    <NoData
      header="Strategy Not Found"
      text="It seems the strategy you’re looking for doesn’t exist."
    />
  )

  return (
    <StrategyForm
      formType={"edit"}
      strategy={strategy}
    />
  )
}