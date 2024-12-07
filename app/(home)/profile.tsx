import { useTheme } from "../../context/ThemeContext";
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Text, Switch } from 'react-native';
import FeatherIcon from '@expo/vector-icons/Feather';
import { signOut } from "../../utils/firebase/auth";
import { useAuth } from "../../context/UserContext";
import { dark, light } from "../../data/colors";

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const colorTheme = theme === "light" ? light : dark
  const [form, setForm] = useState({ emailNotifications: true, pushNotifications: false, });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (theme === "light") {
      setIsDarkMode(false)
    } else {
      setIsDarkMode(true)
    }
  }, [theme])

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
    <ScrollView style={{backgroundColor: colorTheme.bodyBackground}}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: colorTheme.headerText}]}>Profile</Text>

        <View style={[styles.sectionBody, {backgroundColor: colorTheme.sectionBackground}]}>
          <View style={[styles.rowWrapper, styles.rowFirst, {borderColor: colorTheme.bodyBackground}]}>
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <Text style={[styles.rowLabel, {color: colorTheme.main}]}>Profile</Text>

              <View style={styles.rowSpacer} />

              <Text style={[styles.rowValue, {color: colorTheme.headerText}]}>{user.email}</Text>

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </Pressable>
          </View>
          <View style={[styles.rowWrapper, {borderColor: colorTheme.bodyBackground}]}>
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <Text style={[styles.rowLabel, {color: colorTheme.main}]}>Currency</Text>

              <View style={styles.rowSpacer} />

              <Text style={[styles.rowValue, {color: colorTheme.headerText}]}>United States Dollars</Text>

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </Pressable>
          </View>
          <View style={[styles.rowWrapper, {borderColor: colorTheme.bodyBackground}]}>
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <Text style={[styles.rowLabel, {color: colorTheme.main}]}>Language</Text>

              <View style={styles.rowSpacer} />

              <Text style={[styles.rowValue, {color: colorTheme.headerText}]}>English</Text>

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </Pressable>
          </View>

          {/* <View style={[styles.rowWrapper, {borderColor: colorTheme.bodyBackground}]}>
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <Text style={[styles.rowLabel, {color: colorTheme.main}]}>Location</Text>

              <View style={styles.rowSpacer} />

              <Text style={[styles.rowValue, {color: colorTheme.headerText}]}>Los Angeles, CA</Text>

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </Pressable>
          </View> */}

          <View style={[styles.rowWrapper, {borderColor: colorTheme.bodyBackground}]}>
            <View style={styles.row}>
              <Text style={[styles.rowLabel, {color: colorTheme.main}]}>Dark Mode</Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={() => goDarkMode()}
                style={{
                  transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
                }}
                value={isDarkMode} />
            </View>
          </View>

          {/* <View style={[styles.rowWrapper, {borderColor: colorTheme.bodyBackground}]}>
            <View style={styles.row}>
              <Text style={[styles.rowLabel, {color: colorTheme.main}]}>Push Notifications</Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={pushNotifications =>
                  setForm({ ...form, pushNotifications })
                }
                style={{
                  transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
                }}
                value={form.pushNotifications} />
            </View>
          </View> */}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: colorTheme.headerText}]}>Resources</Text>

        <View style={[styles.sectionBody, {backgroundColor: colorTheme.sectionBackground}]}>
          <View style={[styles.rowWrapper, styles.rowFirst, {borderColor: colorTheme.bodyBackground}]}>
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <Text style={[styles.rowLabel, {color: colorTheme.main}]}>Contact Us</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </Pressable>
          </View>

          {/* <View style={[styles.rowWrapper, {borderColor: colorTheme.bodyBackground}]}>
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <Text style={[styles.rowLabel, {color: colorTheme.main}]}>Report Bug</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </Pressable>
          </View> */}

          {/* <View style={[styles.rowWrapper, {borderColor: colorTheme.bodyBackground}]}>
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <Text style={[styles.rowLabel, {color: colorTheme.main}]}>Rate in App Store</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </Pressable>
          </View> */}

          <View style={[styles.rowWrapper, {borderColor: colorTheme.bodyBackground}]}>
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <Text style={[styles.rowLabel, {color: colorTheme.main}]}>Terms and Privacy</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.signOutSection}>
        <Pressable onPress={handleSignOut}>
          <Text style={{color: colorTheme.red}}>Sign Out</Text>
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
    justifyContent: 'flex-start',
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