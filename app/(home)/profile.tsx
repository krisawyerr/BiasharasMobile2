// import { useTheme } from "../../context/ThemeContext";
// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, ScrollView, Pressable, Text, Switch } from 'react-native';
// import FeatherIcon from '@expo/vector-icons/Feather';

// export default function Profile() {
//   const { theme, toggleTheme } = useTheme();
//   const [form, setForm] = useState({ emailNotifications: true, pushNotifications: false, });
//   const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

//   useEffect(() => {
//     if (theme === "light") {
//       setIsDarkMode(false)
//     } else {
//       setIsDarkMode(true)
//     }
//   }, [theme])

//   function goDarkMode() {
//     toggleTheme()
//     setIsDarkMode(!isDarkMode)
//   }

//   return (
//     <ScrollView>
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Resources</Text>

//         <View style={styles.sectionBody}>
//           {/* <View style={[styles.rowWrapper, styles.rowFirst]}>
//             <Pressable
//               onPress={() => {
//                 // handle onPress
//               }}
//               style={styles.row}>
//               <Text style={styles.rowLabel}>Language</Text>

//               <View style={styles.rowSpacer} />

//               <Text style={styles.rowValue}>English</Text>

//               <FeatherIcon
//                 color="#C6C6C6"
//                 name="chevron-right"
//                 size={20} />
//             </Pressable>
//           </View>

//           <View style={styles.rowWrapper}>
//             <Pressable
//               onPress={() => {
//                 // handle onPress
//               }}
//               style={styles.row}>
//               <Text style={styles.rowLabel}>Location</Text>

//               <View style={styles.rowSpacer} />

//               <Text style={styles.rowValue}>Los Angeles, CA</Text>

//               <FeatherIcon
//                 color="#C6C6C6"
//                 name="chevron-right"
//                 size={20} />
//             </Pressable>
//           </View> */}

//           <View style={styles.rowWrapper}>
//             <View style={styles.row}>
//               <Text style={styles.rowLabel}>Dark Mode</Text>

//               <View style={styles.rowSpacer} />

//               <Switch
//                 onValueChange={() => goDarkMode()}
//                 style={{
//                   transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
//                 }}
//                 value={isDarkMode} />
//             </View>
//           </View>

//           {/* <View style={styles.rowWrapper}>
//             <View style={styles.row}>
//               <Text style={styles.rowLabel}>Push Notifications</Text>

//               <View style={styles.rowSpacer} />

//               <Switch
//                 onValueChange={pushNotifications =>
//                   setForm({ ...form, pushNotifications })
//                 }
//                 style={{
//                   transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
//                 }}
//                 value={form.pushNotifications} />
//             </View>
//           </View> */}
//         </View>
//       </View>

//       {/* <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Resources</Text>

//         <View style={styles.sectionBody}>
//           <View style={[styles.rowWrapper, styles.rowFirst]}>
//             <Pressable
//               onPress={() => {
//                 // handle onPress
//               }}
//               style={styles.row}>
//               <Text style={styles.rowLabel}>Contact Us</Text>

//               <View style={styles.rowSpacer} />

//               <FeatherIcon
//                 color="#C6C6C6"
//                 name="chevron-right"
//                 size={20} />
//             </Pressable>
//           </View>

//           <View style={styles.rowWrapper}>
//             <Pressable
//               onPress={() => {
//                 // handle onPress
//               }}
//               style={styles.row}>
//               <Text style={styles.rowLabel}>Report Bug</Text>

//               <View style={styles.rowSpacer} />

//               <FeatherIcon
//                 color="#C6C6C6"
//                 name="chevron-right"
//                 size={20} />
//             </Pressable>
//           </View>

//           <View style={styles.rowWrapper}>
//             <Pressable
//               onPress={() => {
//                 // handle onPress
//               }}
//               style={styles.row}>
//               <Text style={styles.rowLabel}>Rate in App Store</Text>

//               <View style={styles.rowSpacer} />

//               <FeatherIcon
//                 color="#C6C6C6"
//                 name="chevron-right"
//                 size={20} />
//             </Pressable>
//           </View>

//           <View style={styles.rowWrapper}>
//             <Pressable
//               onPress={() => {
//                 // handle onPress
//               }}
//               style={styles.row}>
//               <Text style={styles.rowLabel}>Terms and Privacy</Text>

//               <View style={styles.rowSpacer} />

//               <FeatherIcon
//                 color="#C6C6C6"
//                 name="chevron-right"
//                 size={20} />
//             </Pressable>
//           </View>
//         </View>
//       </View> */}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 24,
//     paddingHorizontal: 0,
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//   },
//   tabs: {
//     flexDirection: 'row',
//     paddingTop: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     paddingHorizontal: 24,
//     marginBottom: 12,
//   },
//   headerTitle: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#1d1d1d',
//   },
//   headerSubtitle: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#929292',
//     marginTop: 6,
//   },
//   profile: {
//     paddingTop: 12,
//     paddingHorizontal: 24,
//     paddingBottom: 24,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#e3e3e3',
//   },
//   profileHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   profileAvatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 9999,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginRight: 12,
//   },
//   profileName: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#3d3d3d',
//   },
//   profileHandle: {
//     marginTop: 4,
//     fontSize: 15,
//     color: '#989898',
//   },
//   profileAction: {
//     marginTop: 16,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#007bff',
//     borderRadius: 12,
//   },
//   profileActionText: {
//     marginRight: 8,
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   tab: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//     overflow: 'hidden',
//     paddingVertical: 10,
//   },
//   tabWrapper: {
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//     borderColor: '#e5e7eb',
//     borderBottomWidth: 2,
//   },
//   tabText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#6b7280',
//     marginLeft: 5,
//   },
//   section: {
//     marginTop: 12,
//   },
//   sectionBody: {
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#e3e3e3',
//     paddingLeft: 24,
//   },
//   sectionTitle: {
//     marginTop: 0,
//     marginHorizontal: 24,
//     marginBottom: 8,
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#a7a7a7',
//     textTransform: 'uppercase',
//     letterSpacing: 1.2,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     height: 44,
//     paddingRight: 24,
//   },
//   rowWrapper: {
//     borderTopWidth: 1,
//     borderColor: '#e3e3e3',
//   },
//   rowFirst: {
//     borderTopWidth: 0,
//   },
//   rowLabel: {
//     fontSize: 17,
//     fontWeight: '500',
//     color: '#2c2c2c',
//   },
//   rowSpacer: {
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//   },
//   rowValue: {
//     fontSize: 17,
//     fontWeight: '500',
//     color: '#7f7f7f',
//     marginRight: 4,
//   },
// });

import React, { useState, useEffect } from "react";
import { Text, TextInput, Button, FlatList, View, StyleSheet } from "react-native";
import { createItem, subscribeToItems, updateItem, deleteItem } from "../../utils/firebase/crud";

export default function App() {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = subscribeToItems(setItems);

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleAddOrUpdate = async () => {
    if (editingId) {
      await updateItem(editingId, { name });
      setEditingId(null);
    } else {
      await createItem({ name });
    }
    setName("");
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter item name"
      />
      <Button title={editingId ? "Update" : "Add"} onPress={handleAddOrUpdate} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Button title="Edit" onPress={() => { setName(item.name); setEditingId(item.id); }} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  item: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
});