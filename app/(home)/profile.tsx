import { Button, StyleSheet, Text, useColorScheme, View } from "react-native";
import { dark, light } from "../../data/colors";
import { useTheme } from "../../context/ThemeContext";

export default function Profile() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, theme === 'light' ? styles.light : styles.dark]}>
      <Text style={styles.text}>Current Theme: {theme}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  light: {
    backgroundColor: '#ffffff',
  },
  dark: {
    backgroundColor: '#000000',
  },
  text: {
    color: '#888888',
    fontSize: 18,
  },
});