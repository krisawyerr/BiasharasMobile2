import { StyleSheet, Text, View } from "react-native";

export default function Strategies() {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>Strategies</Text>
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