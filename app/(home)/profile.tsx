import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.headerText}>Profile Page</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: "white",
    fontSize: 35,
    fontWeight: 700,
  },
  page: {
    flex: 1,
    backgroundColor: "#181818",
    paddingHorizontal: 25
  },
});