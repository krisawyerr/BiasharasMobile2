import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { dark, light } from "../../data/colors";

export default function Profile() {
  const theme = useColorScheme();
  const colorTheme = theme === "light" ? light : dark

  return (
    <View style={[styles.page, {backgroundColor: colorTheme.bodyBackground}]}>
      <Text style={{color: colorTheme.headerText}}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});