import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>Profile</Text>
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