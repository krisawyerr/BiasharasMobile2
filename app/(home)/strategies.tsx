import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { dark, light } from "../../data/colors";
import { useTheme } from "../../context/ThemeContext";

export default function Strategies() {
  const { theme } = useTheme();
  const colorTheme = theme === "light" ? light : dark

  return (
    <View style={[styles.page, {backgroundColor: colorTheme.bodyBackground}]}>
      <Text style={{color: colorTheme.headerText}}>Strategies</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});