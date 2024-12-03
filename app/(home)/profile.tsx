import { StyleSheet, Text, View } from "react-native";
import { dark } from "../../data/colors";

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
    backgroundColor: dark.bodyBackground
  },
  text: {
    color: dark.headerText
  }
});