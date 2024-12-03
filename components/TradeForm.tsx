import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import DatePicker from 'react-native-neat-date-picker'
import { sessions, tradingPairs, types } from '../data/formData'
import { Picker } from 'react-native-ui-lib'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Trade } from '../types/Trade'
import { dark } from '../data/colors'

interface TradeFormProps {
    formType: string;
    trade?: Trade;
}

interface PickerRef {
    openExpandable?: () => void;
}

export default function TradeForm({ formType, trade }: TradeFormProps) {
    const [showDatePickerSingle, setShowDatePickerSingle] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(new Date());
    const openDatePickerSingle = () => setShowDatePickerSingle(true)
    const [selectedPair, setSelectedPair] = useState<string | undefined>();
    const [selectedType, setSelectedType] = useState<string | undefined>();
    const [selectedSession, setSelectedSession] = useState<string | undefined>();
    const [risk, setRisk] = useState<string>();
    const [lots, setLots] = useState<string>();
    const [profits, setProfits] = useState<string>();
    const [notes, setNotes] = useState<string>();

    const pairRef = useRef<PickerRef>(null);
    const typeRef = useRef<PickerRef>(null);
    const sessionRef = useRef<PickerRef>(null);
    const riskRef = useRef<TextInput>(null);
    const lotsRef = useRef<TextInput>(null);
    const profitsRef = useRef<TextInput>(null);
    const notesRef = useRef<TextInput>(null);


    useEffect(() => {
        function setValues() {
            if (formType === "edit") {
                setDate(new Date(trade!.date))
                setSelectedPair(trade!.currencyPair)
                setSelectedType(trade!.type)
                setSelectedSession(trade!.tradingSession)
                setRisk(trade!.amountRisked.toString())
                setLots(trade!.lots.toString())
                setProfits(trade!.profit.toString())
                setNotes(trade!.notes)
            }
        }

        setValues()

    }, [trade])

    const onCancelSingle = () => {
        setShowDatePickerSingle(false)
    }

    const onConfirmSingle = (output: any) => {
        setShowDatePickerSingle(false)
        setDate(output.date)
    }

    return (
        <>
            <KeyboardAwareScrollView
                style={styles.page}
                keyboardShouldPersistTaps="handled"
                enableAutomaticScroll
            >
                <View style={styles.container}>
                    <Pressable onPress={openDatePickerSingle} style={styles.row}>
                        <Text style={styles.headerText}>Date</Text>
                        <Text style={styles.infoText}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                    </Pressable>
                    <Pressable style={styles.row} onPress={() => pairRef.current?.openExpandable?.()}>
                        <Text style={styles.headerText}>Pair</Text>
                        <Text style={styles.infoText}>{selectedPair}</Text>
                        <Picker
                            style={{display: "none"}}
                            showSearch
                            topBarProps={{ title: 'Trading Pair' }}
                            searchStyle={{
                                color: "blue",
                                placeholderTextColor: "gray",
                            }}
                            ref={pairRef}
                            value={selectedPair}
                            onChange={item => setSelectedPair(item?.toString() || undefined)}
                            items={tradingPairs}
                        />
                    </Pressable>
                    <Pressable style={styles.row} onPress={() => typeRef.current?.openExpandable?.()}>
                        <Text style={styles.headerText}>Type</Text>
                        <Text style={styles.infoText}>{selectedType}</Text>
                        <Picker
                            style={{display: "none"}}
                            topBarProps={{ title: 'Type' }}
                            ref={typeRef}
                            value={selectedType}
                            onChange={item => setSelectedType(item?.toString() || undefined)}
                            items={types}
                        />
                    </Pressable>
                    <Pressable style={styles.row} onPress={() => sessionRef.current?.openExpandable?.()}>
                        <Text style={styles.headerText}>Session</Text>
                        <Text style={styles.infoText}>{selectedSession}</Text>
                        <Picker
                            style={{display: "none"}}
                            topBarProps={{ title: 'Session' }}
                            ref={sessionRef}
                            value={selectedSession}
                            onChange={item => setSelectedSession(item?.toString() || undefined)}
                            items={sessions}
                        />
                    </Pressable>
                    <Pressable style={styles.row} onPress={() => riskRef.current?.focus()}>
                        <Text style={styles.headerText}>Risk</Text>
                        <TextInput
                            style={styles.infoText}
                            ref={riskRef}
                            value={risk}
                            onChangeText={(e) => setRisk(e)}
                            keyboardType="numeric"
                        />
                    </Pressable>
                    <Pressable style={styles.row} onPress={() => lotsRef.current?.focus()}>
                        <Text style={styles.headerText}>Lots</Text>
                        <TextInput
                            style={styles.infoText}
                            ref={lotsRef}
                            value={lots}
                            onChangeText={(e) => setLots(e)}
                            keyboardType="numeric"
                        />
                    </Pressable>
                    <Pressable style={styles.row} onPress={() => profitsRef.current?.focus()}>
                        <Text style={styles.headerText}>Profit</Text>
                        <TextInput
                            style={styles.infoText}
                            ref={profitsRef}
                            value={profits}
                            onChangeText={(e) => setProfits(e.replace(/[^-.\d]/g, '').replace(/(?!^)-/g, '').replace(/^(-?\d*\.?\d*).*$/, '$1'))}
                        />
                    </Pressable>
                    <Pressable style={styles.row} onPress={() => notesRef.current?.focus()}>
                        <Text style={styles.headerText}>Notes</Text>
                        <TextInput
                            style={styles.infoText}
                            ref={notesRef}
                            value={notes}
                            onChangeText={(e) => setNotes(e)}
                            multiline={true}
                        />
                    </Pressable>
                </View>
                {formType === "add" ? (
                    <Pressable>
                        <View style={styles.editButton}>
                            <Text style={styles.submitText}>Add Trade</Text>
                        </View>
                    </Pressable>
                ) : (
                    <>
                        <Pressable>
                            <View style={styles.editButton}>
                                <Text style={styles.submitText}>Edit Trade</Text>
                            </View>
                        </Pressable>
                        <Pressable>
                            <View style={styles.submitButton}>
                                <Text style={styles.submitText}>Delete Trade</Text>
                            </View>
                        </Pressable>
                    </>
                )}
            </KeyboardAwareScrollView>

            <DatePicker
                isVisible={showDatePickerSingle}
                mode={'single'}
                onCancel={onCancelSingle}
                onConfirm={onConfirmSingle}
                colorOptions={{
                    backgroundColor: dark.sectionBackground,
                    headerColor: dark.sectionBackground,
                    headerTextColor: dark.headerText,
                    changeYearModalColor: dark.headerText,
                    weekDaysColor: dark.calendarPastDays,
                    dateTextColor: dark.headerText,
                    selectedDateTextColor: dark.headerText,
                    selectedDateBackgroundColor: `${dark.headerText}50`,
                    confirmButtonColor: dark.headerText
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: dark.bodyBackground,
    },
    container: {
        backgroundColor: dark.sectionBackground,
        margin: 20,
        marginBottom: 40,
        borderRadius: 10,
        overflow: "hidden"
    },
    row: {
        padding: 20,
        borderBottomColor: `${dark.headerBackground}60`,
        borderBottomWidth: 1,
        flexDirection: "row"
    },
    lastRow: {
        padding: 20,
        flexDirection: "row"
    },
    headerText: {
        width: "30%",
        color: dark.headerText,
        fontWeight: 700,
        fontSize: 17
    },
    submitText: {
        width: "30%",
        color: dark.headerBackground,
        fontWeight: 700,
        fontSize: 17,
        textAlign: "center"
    },
    infoText: {
        width: "70%",
        color: dark.headerText,
        fontWeight: 400,
        fontSize: 17,
    },
    editButton: {
        backgroundColor: dark.headerText,
        padding: 13,
        margin: "auto",
        marginBottom: 10,
        borderRadius: 50,
        minWidth: 250,
        alignItems: "center"
    },
    submitButton: {
        backgroundColor: dark.red,
        padding: 13,
        margin: "auto",
        marginBottom: 40,
        borderRadius: 50,
        minWidth: 250,
        alignItems: "center"
    }
});