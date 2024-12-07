import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import { strategyTradingPairs, timeframe, tradingStyles } from '../data/formData'
import { Picker } from 'react-native-ui-lib'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { dark, light } from '../data/colors'
import { useTheme } from '../context/ThemeContext'
import { useNavigation } from 'expo-router'
import { Strategy } from '../types/Strategy'
import { createStrategy, deleteStrategy, updateStrategy } from '../utils/firebase/strategies'
import { changeStrategyAfterupdate, removeStrategyAfterDeletion } from '../utils/firebase/trades'
import { useAuth } from '../context/UserContext'
import { PickerRef } from '../types/PickerRef'

interface TradeFormProps {
    formType: string;
    strategy?: Strategy;
}

export default function StrategyForm({ formType, strategy }: TradeFormProps) {
    const { theme } = useTheme();
    const navigation = useNavigation()
    const colorTheme = theme === "light" ? light : dark
    const [selectedStyles, setSelectedStyles] = useState<string | undefined>();
    const [selectedPairs, setSelectedPairs] = useState<string | undefined>();
    const [selectedTimeframe, setSelectedTimeframe] = useState<string | undefined>();
    const [details, setDetails] = useState<string>();
    const [name, setName] = useState<string>();
    const nameRef = useRef<TextInput>(null);
    const stylesRef = useRef<PickerRef>(null);
    const pairsRef = useRef<PickerRef>(null);
    const timeframeRef = useRef<PickerRef>(null);
    const detailsRef = useRef<TextInput>(null);
    const [formHandling, setFormHandling] = useState({
        name: true,
        style: true,
        pair: true,
        timeframe: true,
        details: true,
    })
    const { user } = useAuth()

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
                setSelectedStyles(strategy?.style.toString())
                setSelectedPairs(strategy?.currency_pair.toString())
                setSelectedTimeframe(strategy?.timeframe.toString())
                setName(strategy?.name.toString())
                setDetails(strategy?.detail.toString())
            }
        }

        setValues()

    }, [strategy])

    function validateForm() {
        setFormHandling({
            name: name !== undefined,
            style: selectedStyles !== undefined,
            pair: selectedPairs !== undefined,
            timeframe: selectedTimeframe !== undefined,
            details: details !== undefined,
        })

        return Boolean(name !== undefined && selectedStyles !== undefined && selectedPairs !== undefined && selectedTimeframe !== undefined && details !== undefined)
    }

    async function addStrategy() {
        const validation = validateForm()

        if (!validation) {
            console.log("form not complete")
            return
        }

        await createStrategy({
            currency_pair: selectedPairs,
            detail: details,
            strategyId: `${new Date().getTime()}`,
            name: name,
            style: selectedStyles,
            timeframe: selectedTimeframe,
            user: user.uid
        });

        navigation.goBack()
    };

    async function editStrategy(strategyId: string, strategyName: string) {
        await updateStrategy(strategyId, {
            currency_pair: selectedPairs,
            detail: details,
            strategyId: strategy!.strategyId,
            name: name,
            style: selectedStyles,
            timeframe: selectedTimeframe,
            user: user.uid
        });

        if (name !== strategy?.name) await changeStrategyAfterupdate(user.uid, strategyName, `${name}`)

        navigation.goBack()
    };

    async function handleDeleteStrategy(strategyId: string, strategyName: string) {
        await deleteStrategy(strategyId)
        await removeStrategyAfterDeletion(user.uid, strategyName)

        navigation.pop();
        navigation.navigate('(home)', { screen: 'strategies' });
    };

    return (
        <KeyboardAwareScrollView style={[styles.page, { backgroundColor: colorTheme.bodyBackground, }]} keyboardShouldPersistTaps="handled" enableAutomaticScroll >
            <View style={[styles.container, { backgroundColor: colorTheme.sectionBackground, }]}>
                <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => nameRef.current?.focus()}>
                    <Text style={[styles.headerText, { color: formHandling.name ? colorTheme.headerText : colorTheme.red }]}>Name</Text>
                    <TextInput
                        style={[styles.infoText, { color: colorTheme.headerText, }]}
                        ref={nameRef}
                        value={name}
                        onChangeText={(e) => setName(e)}
                    />
                </Pressable>
                <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => stylesRef.current?.openExpandable?.()}>
                    <Text style={[styles.headerText, { color: formHandling.style ? colorTheme.headerText : colorTheme.red }]}>Styles</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{selectedStyles}</Text>
                    <Picker
                        style={{ display: "none" }}
                        showSearch
                        topBarProps={{ title: 'Trading Strategy' }}
                        searchStyle={{
                            color: "blue",
                            placeholderTextColor: "gray",
                        }}
                        ref={stylesRef}
                        value={selectedStyles}
                        onChange={item => setSelectedStyles(item?.toString() || undefined)}
                        items={tradingStyles}
                    />
                </Pressable>
                <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => pairsRef.current?.openExpandable?.()}>
                    <Text style={[styles.headerText, { color: formHandling.pair ? colorTheme.headerText : colorTheme.red }]}>Pairs</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{selectedPairs}</Text>
                    <Picker
                        style={{ display: "none" }}
                        showSearch
                        topBarProps={{ title: 'Trading Strategy' }}
                        searchStyle={{
                            color: "blue",
                            placeholderTextColor: "gray",
                        }}
                        ref={pairsRef}
                        value={selectedPairs}
                        onChange={item => setSelectedPairs(item?.toString() || undefined)}
                        items={strategyTradingPairs}
                    />
                </Pressable>
                <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => timeframeRef.current?.openExpandable?.()}>
                    <Text style={[styles.headerText, { color: formHandling.timeframe ? colorTheme.headerText : colorTheme.red }]}>Timeframe</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{selectedTimeframe}</Text>
                    <Picker
                        style={{ display: "none" }}
                        showSearch
                        topBarProps={{ title: 'Trading Strategy' }}
                        searchStyle={{
                            color: "blue",
                            placeholderTextColor: "gray",
                        }}
                        ref={timeframeRef}
                        value={selectedTimeframe}
                        onChange={item => setSelectedTimeframe(item?.toString() || undefined)}
                        items={timeframe}
                    />
                </Pressable>
                <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => detailsRef.current?.focus()}>
                    <Text style={[styles.headerText, { color: formHandling.details ? colorTheme.headerText : colorTheme.red }]}>Details</Text>
                    <TextInput
                        style={[styles.infoText, { color: colorTheme.headerText, }]}
                        ref={detailsRef}
                        value={details}
                        onChangeText={(e) => setDetails(e)}
                        multiline={true}
                    />
                </Pressable>
            </View>
            {formType === "add" ? (
                <Pressable onPress={() => addStrategy()}>
                    <View style={[styles.editButton, { backgroundColor: colorTheme.headerText, }]}>
                        <Text style={[styles.submitText, { color: colorTheme.headerBackground, }]}>Add Strategy</Text>
                    </View>
                </Pressable>
            ) : (
                <>
                    <Pressable onPress={() => editStrategy(strategy!.id, strategy!.name)}>
                        <View style={[styles.editButton, { backgroundColor: colorTheme.headerText, }]}>
                            <Text style={[styles.buttonText, { color: colorTheme.headerBackground, }]}>Edit Strategy</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => handleDeleteStrategy(strategy!.id, strategy!.name)}>
                        <View style={[styles.submitButton, { backgroundColor: colorTheme.red, }]}>
                            <Text style={[styles.buttonText, { color: colorTheme.headerBackground, }]}>Delete Strategy</Text>
                        </View>
                    </Pressable>
                </>
            )}
        </KeyboardAwareScrollView>
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
    buttonText: {
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
        alignItems: "center",
        justifyContent: "center"
    },
    submitButton: {
        padding: 13,
        margin: "auto",
        marginBottom: 40,
        borderRadius: 50,
        minWidth: 250,
        alignItems: "center",
        justifyContent: "center"
    }
});