import React, { useRef, useState } from 'react'
import { StyleSheet, View, Button, Text, ScrollView, Pressable, TextInput } from 'react-native'
import DatePicker from 'react-native-neat-date-picker'
import { sessions, tradingPairs, types } from '../data/formData'
import { Picker } from 'react-native-ui-lib'

const App = () => {
  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false)
  const [date, setDate] = useState(new Date());
  const openDatePickerSingle = () => setShowDatePickerSingle(true)
  const [selectedPair, setSelectedPair] = useState();
  const [selectedType, setSelectedType] = useState();
  const [selectedSession, setSelectedSession] = useState();
  const [risk, setRisk] = useState();
  const [lots, setLots] = useState();
  const [profits, setProfits] = useState();
  const [notes, setNotes] = useState();

  const pairRef = useRef(null);
  const typeRef = useRef(null);
  const sessionRef = useRef(null);
  const riskRef = useRef(null);
  const lotsRef = useRef(null);
  const profitsRef = useRef(null);
  const notesRef = useRef(null);

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
          <Pressable style={styles.row} onPress={() => pairRef.current?.openExpandable?.()}>
            <Text style={styles.headerText}>Pair</Text>
            <Text style={styles.infoText}>{selectedPair}</Text>
            <Picker
              showSearch
              topBarProps={{title: 'Trading Pair'}}
              searchStyle={{
                color: "blue",
                placeholderTextColor: "gray",
              }}
              ref={pairRef}
              value={selectedPair}
              onChange={item => setSelectedPair(item)}
              items={tradingPairs}
            />
          </Pressable>
          <Pressable style={styles.row} onPress={() => typeRef.current?.openExpandable?.()}>
            <Text style={styles.headerText}>Type</Text>
            <Text style={styles.infoText}>{selectedType}</Text>
            <Picker
              topBarProps={{title: 'Type'}}
              ref={typeRef}
              value={selectedType}
              onChange={item => setSelectedType(item)}
              items={types}
            />
          </Pressable>
          <Pressable style={styles.row} onPress={() => sessionRef.current?.openExpandable?.()}>
            <Text style={styles.headerText}>Session</Text>
            <Text style={styles.infoText}>{selectedSession}</Text>
            <Picker
              topBarProps={{title: 'Session'}}
              ref={sessionRef}
              value={selectedSession}
              onChange={item => setSelectedSession(item)}
              items={sessions}
            />
          </Pressable>
          <Pressable style={styles.row} onPress={() => riskRef.current?.focus()}>
            <Text style={styles.headerText}>Risk</Text>
            <TextInput
              style={styles.infoText}
              ref={riskRef}
              value={risk}  
              onChangeText={() => setRisk}  
              keyboardType="numeric" 
            />
          </Pressable>
          <Pressable style={styles.row} onPress={() => lotsRef.current?.focus()}>
            <Text style={styles.headerText}>Lots</Text>
            <TextInput
              style={styles.infoText}
              ref={lotsRef}
              value={lots}  
              onChangeText={() => setLots}  
              keyboardType="numeric" 
            />
          </Pressable>
          <Pressable style={styles.row} onPress={() => profitsRef.current?.focus()}>
            <Text style={styles.headerText}>Profit</Text>
            <TextInput
              style={styles.infoText}
              ref={profitsRef}
              value={profits}  
              onChangeText={() => setProfits}  
              keyboardType="numeric" 
            />
          </Pressable>
          <Pressable style={styles.row} onPress={() => notesRef.current?.focus()}>
            <Text style={styles.headerText}>Notes</Text>
            <TextInput
              style={styles.infoText}
              ref={notesRef}
              value={notes}  
              onChangeText={() => setNotes}  
              multiline={true}
            />
          </Pressable>
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
    fontSize: 17,
    overflow: ""
  }
});