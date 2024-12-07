import { useTheme } from "../../context/ThemeContext";
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Text, Switch } from 'react-native';
import FeatherIcon from '@expo/vector-icons/Feather';
import { signOut } from "../../utils/firebase/auth";
import { useAuth } from "../../context/UserContext";
import { dark, light } from "../../data/colors";
import { Picker } from "react-native-ui-lib";
import { currencies } from "../../data/formData";
import { PickerRef } from "../../types/PickerRef";

export default function Profile() {
  const { theme, toggleTheme, currency, setCurrency } = useTheme();
  const colorTheme = theme === "light" ? light : dark
  const [form, setForm] = useState({ emailNotifications: true, pushNotifications: false, });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const { user, setUser } = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>();
  const currencyRef = useRef<PickerRef>(null);

  useEffect(() => {
    if (theme === "light") {
      setIsDarkMode(false)
    } else {
      setIsDarkMode(true)
    }
  }, [theme])

  useEffect(() => {
    if (selectedCurrency) {
      setCurrency(selectedCurrency)
    }
  }, [selectedCurrency])

  function goDarkMode() {
    toggleTheme()
    setIsDarkMode(!isDarkMode)
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: colorTheme.bodyBackground }}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colorTheme.headerText }]}>Profile</Text>
        <View style={[styles.sectionBody, { backgroundColor: colorTheme.sectionBackground }]}>
          <View style={[styles.rowWrapper, styles.rowFirst, { borderColor: colorTheme.bodyBackground }]}>
            <View style={styles.row}>
              <Text style={[styles.rowLabel, { color: colorTheme.main }]}>Name</Text>
              <Text style={[styles.rowValue, { color: colorTheme.headerText }]}>{user.fullName}</Text>
            </View>
          </View>
          <View style={[styles.rowWrapper, { borderColor: colorTheme.bodyBackground }]}>
            <View style={styles.row}>
              <Text style={[styles.rowLabel, { color: colorTheme.main }]}>Email</Text>
              <Text style={[styles.rowValue, { color: colorTheme.headerText }]}>{user.email}</Text>
            </View>
          </View>
          <View style={[styles.rowWrapper, { borderColor: colorTheme.bodyBackground }]}>
            <Pressable onPress={() => currencyRef.current?.openExpandable?.()} style={styles.row}>
              <Text style={[styles.rowLabel, { color: colorTheme.main }]}>Currency</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.rowValue, { color: colorTheme.headerText }]}>{currency}</Text>
                <FeatherIcon color={colorTheme.headerText} name="chevron-right" size={20} />
              </View>
            </Pressable>
            <Picker
              style={{ display: "none" }}
              showSearch
              topBarProps={{ title: 'Currency' }}
              searchStyle={{
                color: "blue",
                placeholderTextColor: "gray",
              }}
              ref={currencyRef}
              value={selectedCurrency}
              onChange={item => setSelectedCurrency(item?.toString() || undefined)}
              items={currencies}
            />
          </View>
          <View style={[styles.rowWrapper, { borderColor: colorTheme.bodyBackground }]}>
            <View style={styles.row}>
              <Text style={[styles.rowLabel, { color: colorTheme.main }]}>Dark Mode</Text>
              <Switch
                onValueChange={() => goDarkMode()}
                style={{
                  transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
                }}
                value={isDarkMode}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colorTheme.headerText }]}>Resources</Text>
        <View style={[styles.sectionBody, { backgroundColor: colorTheme.sectionBackground }]}>
          <View style={[styles.rowWrapper, styles.rowFirst, { borderColor: colorTheme.bodyBackground }]}>
            <Pressable onPress={() => { }} style={styles.row}>
              <Text style={[styles.rowLabel, { color: colorTheme.main }]}>Contact Us</Text>
              <FeatherIcon color={colorTheme.headerText} name="chevron-right" size={20} />
            </Pressable>
          </View>
          <View style={[styles.rowWrapper, { borderColor: colorTheme.bodyBackground }]}>
            <Pressable onPress={() => { }} style={styles.row}>
              <Text style={[styles.rowLabel, { color: colorTheme.main }]}>Terms and Privacy</Text>
              <FeatherIcon color={colorTheme.headerText} name="chevron-right" size={20} />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.signOutSection}>
        <Pressable onPress={handleSignOut}>
          <Text style={{ color: colorTheme.red }}>Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    paddingVertical: 10,
  },
  section: {
    marginTop: 12,
  },
  signOutSection: {
    marginTop: 30,
    alignItems: "center"
  },
  sectionBody: {
    paddingLeft: 24,
  },
  sectionTitle: {
    marginTop: 0,
    marginHorizontal: 24,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    height: 44,
    paddingRight: 24,
  },
  rowWrapper: {
    borderTopWidth: 1,
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: '500',
    marginRight: 4,
  },
});

// import React from 'react';
// import { Text, View, Button } from 'react-native';
// import { useTheme } from '../../context/ThemeContext';

// export default function Profile() {
//   const { theme, toggleTheme, currency, setCurrency } = useTheme();

//   return (
//     <View>
//       <Text>Current Theme: {theme}</Text>
//       <Text>Current Currency: {currency}</Text>
//       <Button title="Toggle Theme" onPress={toggleTheme} />
//       <Button title="Set Currency to EUR" onPress={() => setCurrency('EUR')} />
//     </View>
//   );
// };
