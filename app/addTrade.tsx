import React, { useRef, useState } from 'react'
import { StyleSheet, View, Button, Text, ScrollView, Pressable } from 'react-native'
import DatePicker from 'react-native-neat-date-picker'
import { tradingPairs } from '../data/pairs'
import { Picker } from 'react-native-ui-lib'

const App = () => {
  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false)
  const [date, setDate] = useState(new Date());
  const openDatePickerSingle = () => setShowDatePickerSingle(true)
  const [selectedPair, setSelectedPair] = useState();
  const pickerRef = useRef(null);

  const onCancelSingle = () => {
    setShowDatePickerSingle(false)
  }

  const onConfirmSingle = (output) => {
    setShowDatePickerSingle(false)
    console.log(output)
    setDate(output.date)
  }

  return (
    <>
      <ScrollView style={styles.page}>
        <View style={styles.container}>
          <Pressable onPress={openDatePickerSingle} style={styles.row}>
            <Text style={styles.headerText}>Date</Text>
            <Text style={styles.infoText}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
          </Pressable>
          <Pressable style={styles.row} onPress={() => pickerRef.current?.openExpandable?.()}>
            <Text style={styles.headerText}>Pair</Text>
            <Text style={styles.infoText}>{selectedPair}</Text>
            <Picker
              showSearch
              searchPlaceholder="Search a language"
              topBarProps={{title: 'Trading Pair'}}
              searchStyle={{
                color: "blue",
                placeholderTextColor: "gray",
              }}
              ref={pickerRef}
              value={selectedPair}
              onChange={item => setSelectedPair(item)}
              items={tradingPairs}
            />
          </Pressable>




          <View style={styles.row}>
            <Text style={styles.headerText}>Type</Text>
            <Text style={styles.infoText}></Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.headerText}>Session</Text>
            <Text style={styles.infoText}></Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.headerText}>Risk</Text>
            <Text style={styles.infoText}></Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.headerText}>Lots</Text>
            <Text style={styles.infoText}></Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.headerText}>Profit</Text>
            <Text style={styles.infoText}></Text>
          </View>
          <View style={styles.lastRow}>
            <Text style={styles.headerText}>Notes</Text>
            <Text style={styles.infoText}></Text>
          </View>
        </View>
      </ScrollView>

      <DatePicker
        isVisible={showDatePickerSingle}
        mode={'single'}
        onCancel={onCancelSingle}
        onConfirm={onConfirmSingle}
        colorOptions={{
          backgroundColor: "#2c2734",
          headerColor: "#2c2734",
          headerTextColor: "#cac4cd",
          changeYearModalColor: "#cac4cd",
          weekDaysColor: "white",
          dateTextColor: "#cac4cd",
          selectedDateTextColor: "#cac4cd",
          selectedDateBackgroundColor: "#cac4cd50",
          confirmButtonColor: "#cac4cd"
        }}
      />
    </>
  )
}

export default App

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#120f14",
  },
  container: {
    backgroundColor: "#2c2734",
    margin: 20,
    marginBottom: 40,
    borderRadius: 10,
    overflow: "hidden"
  },
  row: {
    padding: 20,
    borderBottomColor: "#120f1460",
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  lastRow: {
    padding: 20,
    flexDirection: "row"
  },
  headerText: {
    width: "30%",
    color: "#e5e1e5",
    fontWeight: 700,
    fontSize: 17
  },
  infoText: {
    width: "70%",
    color: "#e5e1e5",
    fontWeight: 400,
    fontSize: 17
  }
});