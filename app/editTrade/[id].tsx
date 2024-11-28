
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import TRADES from '../../data/trades.json';
import { useEffect } from "react";

export default function EditTrade() {
  const route = useRoute<any>()
  const navigation = useNavigation()
  const { id } = route.params
  const trade = TRADES.transactions.find(item => item.transactionId.toString() === id)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text>Cancel</Text>
      ),
      headerLeft: () => (
        <Text>Delete</Text>
      ),
    })
  }, [navigation])

  return (
    <View style={styles.page}>
      <Text style={styles.text}>Edit Trade: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#120f14"
  },
  text: {
    color: "white"
  }
});
