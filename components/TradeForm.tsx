import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import DatePicker from 'react-native-neat-date-picker'
import { sessions, tradingPairs, types } from '../data/formData'
import { Picker } from 'react-native-ui-lib'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Trade } from '../types/Trade'
import { dark, light } from '../data/colors'
import { useTheme } from '../context/ThemeContext'
import { useNavigation } from 'expo-router'
import { subscribeToStrategies } from '../utils/firebase/strategies'
import { Strategy } from '../types/Strategy'
import { createTrade, deleteTrade, updateTrade } from '../utils/firebase/trades'
import { useAuth } from '../context/UserContext'

interface TradeFormProps {
    formType: string;
    trade?: Trade;
}

interface StrategyList {
    label: string;
    value: string
}

interface PickerRef {
    openExpandable?: () => void;
}

export default function TradeForm({ formType, trade }: TradeFormProps) {
    const { theme } = useTheme();
    const navigation = useNavigation()
    const colorTheme = theme === "light" ? light : dark
    const [showDatePickerSingle, setShowDatePickerSingle] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(new Date());
    const openDatePickerSingle = () => setShowDatePickerSingle(true)
    const [selectedPair, setSelectedPair] = useState<string | undefined>();
    const [selectedStrategy, setSelectedStrategy] = useState<string | undefined>();
    const [selectedType, setSelectedType] = useState<string | undefined>();
    const [selectedSession, setSelectedSession] = useState<string | undefined>();
    const [strategiesList, setStrategiesList] = useState<StrategyList[]>();
    const [risk, setRisk] = useState<string>();
    const [lots, setLots] = useState<string>();
    const [profits, setProfits] = useState<string>();
    const [notes, setNotes] = useState<string>();
    const [items, setItems] = useState<Strategy[]>([]);
    const pairRef = useRef<PickerRef>(null);
    const strategyRef = useRef<PickerRef>(null);
    const typeRef = useRef<PickerRef>(null);
    const sessionRef = useRef<PickerRef>(null);
    const riskRef = useRef<TextInput>(null);
    const lotsRef = useRef<TextInput>(null);
    const profitsRef = useRef<TextInput>(null);
    const notesRef = useRef<TextInput>(null);
    const [formHandling, setFormHandling] = useState({
        strat: true,
        pair: true,
        type: true,
        session: true,
        risk: true,
        lots: true,
        profits: true,
    })
    const { user } = useAuth();

    useEffect(() => {
        const unsubscribe = subscribeToStrategies(user.uid, setItems);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        let list: StrategyList[] = []

        list.push({ label: "None", value: 'none' })
        items.forEach(item => {
            list.push({ label: item.name, value: item.name })
        })

        setStrategiesList(list)
    }, [items]);

    useEffect(() => {
        navigation.setOptions({
            headerTitleStyle: {
                color: colorTheme.headerText
            },
            headerStyle: {
                backgroundColor: colorTheme.headerBackground,
            },
        });
    }, [navigation]);

    useEffect(() => {
        function setValues() {
            if (formType === "edit") {
                setDate(new Date(trade!.date))
                setSelectedPair(trade!.currencyPair)
                setSelectedStrategy(trade!.strategyUsed)
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

    function validateForm() {
        setFormHandling({
            strat: selectedStrategy !== undefined,
            pair: selectedPair !== undefined,
            type: selectedType !== undefined,
            session: selectedSession !== undefined,
            risk: risk !== undefined,
            lots: lots !== undefined,
            profits: profits !== undefined,
        })

        return Boolean(selectedStrategy !== undefined && selectedPair !== undefined && selectedType !== undefined && selectedSession !== undefined && risk !== undefined && lots !== undefined && profits !== undefined)
    }

    function onCancelSingle() {
        setShowDatePickerSingle(false)
    }

    function onConfirmSingle(output: any) {
        setShowDatePickerSingle(false)
        setDate(output.date)
    }

    async function addTrade() {
        const validation = validateForm()

        if (!validation) {
            console.log("form not complete")
            return
        }

        await createTrade({
            currencyPair: selectedPair,
            amountRisked: risk,
            date: `${new Date(date)}`,
            profit: profits,
            transactionId: `${new Date().getTime()}`,
            type: selectedType,
            lots: lots,
            tradingSession: selectedSession,
            strategyUsed: selectedStrategy,
            notes: notes || "",
            user: user.uid
        });

        navigation.goBack()
    };

    async function editTrade(tradeId: string) {
        await updateTrade(tradeId, {
            currencyPair: selectedPair,
            amountRisked: risk,
            date: `${new Date(date)}`,
            profit: profits,
            transactionId: trade!.transactionId,
            type: selectedType,
            lots: lots,
            tradingSession: selectedSession,
            strategyUsed: selectedStrategy,
            notes: notes,
            user: user.uid
        });

        navigation.goBack()
    };

    async function handleDeleteTrade(tradeId: string) {
        await deleteTrade(tradeId)

        navigation.pop();
        navigation.navigate('(home)', { screen: 'trades' });
    };

    return (
        <>
            <KeyboardAwareScrollView
                style={[styles.page, { backgroundColor: colorTheme.bodyBackground, }]}
                keyboardShouldPersistTaps="handled"
                enableAutomaticScroll
            >
                <View style={[styles.container, { backgroundColor: colorTheme.sectionBackground, }]}>
                    <Pressable onPress={openDatePickerSingle} style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]}>
                        <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Date</Text>
                        <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                    </Pressable>
                    <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => strategyRef.current?.openExpandable?.()}>
                        <Text style={[styles.headerText, { color: formHandling.strat ? colorTheme.headerText : colorTheme.red }]}>Strategy</Text>
                        <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{selectedStrategy}</Text>
                        <Picker
                            style={{ display: "none" }}
                            showSearch
                            topBarProps={{ title: 'Trading Strategy' }}
                            searchStyle={{
                                color: "blue",
                                placeholderTextColor: "gray",
                            }}
                            ref={strategyRef}
                            value={selectedPair}
                            onChange={item => setSelectedStrategy(item?.toString() || undefined)}
                            items={strategiesList}
                        />
                    </Pressable>
                    <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => pairRef.current?.openExpandable?.()}>
                        <Text style={[styles.headerText, { color: formHandling.pair ? colorTheme.headerText : colorTheme.red }]}>Pair</Text>
                        <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{selectedPair}</Text>
                        <Picker
                            style={{ display: "none" }}
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
                    <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => typeRef.current?.openExpandable?.()}>
                        <Text style={[styles.headerText, { color: formHandling.type ? colorTheme.headerText : colorTheme.red }]}>Type</Text>
                        <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{selectedType}</Text>
                        <Picker
                            style={{ display: "none" }}
                            topBarProps={{ title: 'Type' }}
                            ref={typeRef}
                            value={selectedType}
                            onChange={item => setSelectedType(item?.toString() || undefined)}
                            items={types}
                        />
                    </Pressable>
                    <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => sessionRef.current?.openExpandable?.()}>
                        <Text style={[styles.headerText, { color: formHandling.session ? colorTheme.headerText : colorTheme.red }]}>Session</Text>
                        <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{selectedSession}</Text>
                        <Picker
                            style={{ display: "none" }}
                            topBarProps={{ title: 'Session' }}
                            ref={sessionRef}
                            value={selectedSession}
                            onChange={item => setSelectedSession(item?.toString() || undefined)}
                            items={sessions}
                        />
                    </Pressable>
                    <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => riskRef.current?.focus()}>
                        <Text style={[styles.headerText, { color: formHandling.risk ? colorTheme.headerText : colorTheme.red }]}>Risk</Text>
                        <TextInput
                            style={[styles.infoText, { color: colorTheme.headerText, }]}
                            ref={riskRef}
                            value={risk}
                            onChangeText={(e) => setRisk(e.replace(/[^-.\d]/g, '').replace(/(?!^)-/g, '').replace(/^(-?\d*\.?\d*).*$/, '$1'))}
                            keyboardType="numeric"
                        />
                    </Pressable>
                    <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => lotsRef.current?.focus()}>
                        <Text style={[styles.headerText, { color: formHandling.lots ? colorTheme.headerText : colorTheme.red }]}>Lots</Text>
                        <TextInput
                            style={[styles.infoText, { color: colorTheme.headerText, }]}
                            ref={lotsRef}
                            value={lots}
                            onChangeText={(e) => setLots(e.replace(/[^-.\d]/g, '').replace(/(?!^)-/g, '').replace(/^(-?\d*\.?\d*).*$/, '$1'))}
                            keyboardType="numeric"
                        />
                    </Pressable>
                    <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => profitsRef.current?.focus()}>
                        <Text style={[styles.headerText, { color: formHandling.profits ? colorTheme.headerText : colorTheme.red }]}>Profit</Text>
                        <TextInput
                            style={[styles.infoText, { color: colorTheme.headerText, }]}
                            ref={profitsRef}
                            value={profits}
                            onChangeText={(e) => setProfits(e.replace(/[^-.\d]/g, '').replace(/(?!^)-/g, '').replace(/^(-?\d*\.?\d*).*$/, '$1'))}
                        />
                    </Pressable>
                    <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => notesRef.current?.focus()}>
                        <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Notes</Text>
                        <TextInput
                            style={[styles.infoText, { color: colorTheme.headerText, }]}
                            ref={notesRef}
                            value={notes}
                            onChangeText={(e) => setNotes(e)}
                            multiline={true}
                        />
                    </Pressable>
                </View>
                {formType === "add" ? (
                    <Pressable onPress={() => addTrade()}>
                        <View style={[styles.editButton, { backgroundColor: colorTheme.headerText, }]}>
                            <Text style={[styles.submitText, { color: colorTheme.headerBackground, }]}>Add Trade</Text>
                        </View>
                    </Pressable>
                ) : (
                    <>
                        <Pressable onPress={() => editTrade(trade!.id)}>
                            <View style={[styles.editButton, { backgroundColor: colorTheme.headerText, }]}>
                                <Text style={[styles.buttonText, { color: colorTheme.headerBackground, }]}>Edit Trade</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => handleDeleteTrade(trade!.id)}>
                            <View style={[styles.submitButton, { backgroundColor: colorTheme.red, }]}>
                                <Text style={[styles.buttonText, { color: colorTheme.headerBackground, }]}>Delete Trade</Text>
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
                    backgroundColor: colorTheme.sectionBackground,
                    headerColor: colorTheme.sectionBackground,
                    headerTextColor: colorTheme.headerText,
                    changeYearModalColor: colorTheme.headerText,
                    weekDaysColor: colorTheme.calendarPastDays,
                    dateTextColor: colorTheme.headerText,
                    selectedDateTextColor: colorTheme.headerText,
                    selectedDateBackgroundColor: `${colorTheme.headerText}50`,
                    confirmButtonColor: colorTheme.headerText
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    container: {
        margin: 20,
        marginBottom: 40,
        borderRadius: 10,
        overflow: "hidden"
    },
    row: {
        padding: 20,
        borderBottomWidth: 1,
        flexDirection: "row"
    },
    lastRow: {
        padding: 20,
        flexDirection: "row"
    },
    headerText: {
        width: "30%",
        fontWeight: 700,
        fontSize: 17
    },
    submitText: {
        width: "30%",
        fontWeight: 700,
        fontSize: 17,
        textAlign: "center"
    },
    infoText: {
        width: "70%",
        fontWeight: 400,
        fontSize: 17,
    },
    editButton: {
        padding: 13,
        margin: "auto",
        marginBottom: 10,
        borderRadius: 50,
        minWidth: 250,
        alignItems: "center"
    },
    submitButton: {
        padding: 13,
        margin: "auto",
        marginBottom: 40,
        borderRadius: 50,
        minWidth: 250,
        alignItems: "center"
    },
    buttonText: {
        fontWeight: 700,
        fontSize: 17,
        textAlign: "center"
    },
});