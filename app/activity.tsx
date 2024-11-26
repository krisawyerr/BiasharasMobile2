import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Activity() {
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.text}>Activity</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#181818"
  },
  text: {
    color: "white"
  }
});